import { NextResponse } from "next/server"
import { ZodError } from "zod"

// Custom error classes
export class ValidationError extends Error {
  constructor(
    message: string,
    public details?: Record<string, string[]>
  ) {
    super(message)
    this.name = "ValidationError"
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = "Authentication required") {
    super(message)
    this.name = "AuthenticationError"
  }
}

export class AuthorizationError extends Error {
  constructor(message: string = "Insufficient permissions") {
    super(message)
    this.name = "AuthorizationError"
  }
}

export class NotFoundError extends Error {
  constructor(message: string = "Resource not found") {
    super(message)
    this.name = "NotFoundError"
  }
}

export class ConflictError extends Error {
  constructor(message: string = "Resource conflict") {
    super(message)
    this.name = "ConflictError"
  }
}

// Error handler function
export function handleError(error: unknown): NextResponse {
  console.error("Error occurred:", error)

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "ValidationError",
        message: "Invalid input data",
        details: error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  // Handle custom validation errors
  if (error instanceof ValidationError) {
    return NextResponse.json(
      {
        error: "ValidationError",
        message: error.message,
        details: error.details,
      },
      { status: 400 }
    )
  }

  // Handle authentication errors
  if (error instanceof AuthenticationError) {
    return NextResponse.json(
      {
        error: "AuthenticationError",
        message: error.message,
      },
      { status: 401 }
    )
  }

  // Handle authorization errors
  if (error instanceof AuthorizationError) {
    return NextResponse.json(
      {
        error: "AuthorizationError",
        message: error.message,
      },
      { status: 403 }
    )
  }

  // Handle not found errors
  if (error instanceof NotFoundError) {
    return NextResponse.json(
      {
        error: "NotFoundError",
        message: error.message,
      },
      { status: 404 }
    )
  }

  // Handle conflict errors
  if (error instanceof ConflictError) {
    return NextResponse.json(
      {
        error: "ConflictError",
        message: error.message,
      },
      { status: 409 }
    )
  }

  // Handle Prisma errors
  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as { code: string; meta?: any }

    // Unique constraint violation
    if (prismaError.code === "P2002") {
      return NextResponse.json(
        {
          error: "ConflictError",
          message: "A record with this value already exists",
        },
        { status: 409 }
      )
    }

    // Record not found
    if (prismaError.code === "P2025") {
      return NextResponse.json(
        {
          error: "NotFoundError",
          message: "Record not found",
        },
        { status: 404 }
      )
    }

    // Foreign key constraint violation
    if (prismaError.code === "P2003") {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "Invalid reference to related record",
        },
        { status: 400 }
      )
    }
  }

  // Handle generic errors
  if (error instanceof Error) {
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred",
      },
      { status: 500 }
    )
  }

  // Fallback for unknown errors
  return NextResponse.json(
    {
      error: "ServerError",
      message: "An unexpected error occurred",
    },
    { status: 500 }
  )
}

// Async error wrapper for API routes
export function withErrorHandler<T extends any[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R | NextResponse> => {
    try {
      return await handler(...args)
    } catch (error) {
      return handleError(error) as R
    }
  }
}
