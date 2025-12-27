"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Build the Future with <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-primary">
                Robowala
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
              From Arduino to Raspberry Pi, sensors to motors - everything you need 
              to bring your robotics and electronics projects to life.
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <Button asChild size="lg">
                <Link href="/products">Shop Products</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 h-full">
          <div className="space-y-4">
            <Image
              src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
              alt="Arduino Development"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-32"
            />
            <Image
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop"
              alt="Electronics Components"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-32"
            />
          </div>
          <div className="space-y-4">
            <Image
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop"
              alt="Robotics Kit"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-40"
            />
            <Image
              src="https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&h=300&fit=crop"
              alt="Sensors"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-24"
            />
          </div>
          <div className="hidden md:block space-y-4">
            <Image
              src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&h=300&fit=crop"
              alt="3D Printing"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-32"
            />
            <Image
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop"
              alt="Circuit Board"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-32"
            />
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}