"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Percent, Gift, Tag, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  minOrder: number
  maxDiscount?: number
  expiresAt: string
  isActive: boolean
  usageLimit: number
  usedCount: number
}

interface Promotion {
  id: string
  title: string
  description: string
  type: "banner" | "popup" | "discount"
  isActive: boolean
  startDate: string
  endDate: string
  targetUrl?: string
}

export default function SettingsPage() {
  const router = useRouter()
  const { isAuthenticated, user, isLoading } = useAuth()
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  // Coupon form state
  const [couponForm, setCouponForm] = useState({
    code: "",
    type: "percentage" as "percentage" | "fixed",
    value: 0,
    minOrder: 0,
    maxDiscount: 0,
    expiresAt: "",
    usageLimit: 100,
  })

  // Promotion form state
  const [promotionForm, setPromotionForm] = useState({
    title: "",
    description: "",
    type: "banner" as "banner" | "popup" | "discount",
    startDate: "",
    endDate: "",
    targetUrl: "",
  })

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "ADMIN")) {
      router.push("/")
      return
    }

    if (isAuthenticated && user?.role === "ADMIN") {
      loadData()
    }
  }, [isAuthenticated, user, isLoading, router])

  const loadData = async () => {
    setIsLoadingData(true)
    // Simulate API calls - replace with actual API endpoints
    setTimeout(() => {
      setCoupons([
        {
          id: "1",
          code: "WELCOME10",
          type: "percentage",
          value: 10,
          minOrder: 500,
          expiresAt: "2024-12-31",
          isActive: true,
          usageLimit: 1000,
          usedCount: 45,
        },
        {
          id: "2",
          code: "SAVE100",
          type: "fixed",
          value: 100,
          minOrder: 1000,
          expiresAt: "2024-12-25",
          isActive: true,
          usageLimit: 500,
          usedCount: 123,
        },
      ])

      setPromotions([
        {
          id: "1",
          title: "Holiday Sale",
          description: "Up to 50% off on all electronics",
          type: "banner",
          isActive: true,
          startDate: "2024-12-01",
          endDate: "2024-12-31",
          targetUrl: "/products?sale=true",
        },
      ])
      setIsLoadingData(false)
    }, 1000)
  }

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newCoupon: Coupon = {
      id: Date.now().toString(),
      ...couponForm,
      isActive: true,
      usedCount: 0,
    }

    setCoupons([...coupons, newCoupon])
    setCouponForm({
      code: "",
      type: "percentage",
      value: 0,
      minOrder: 0,
      maxDiscount: 0,
      expiresAt: "",
      usageLimit: 100,
    })
    toast.success("Coupon created successfully")
  }

  const handleCreatePromotion = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newPromotion: Promotion = {
      id: Date.now().toString(),
      ...promotionForm,
      isActive: true,
    }

    setPromotions([...promotions, newPromotion])
    setPromotionForm({
      title: "",
      description: "",
      type: "banner",
      startDate: "",
      endDate: "",
      targetUrl: "",
    })
    toast.success("Promotion created successfully")
  }

  const toggleCouponStatus = (id: string) => {
    setCoupons(coupons.map(c => 
      c.id === id ? { ...c, isActive: !c.isActive } : c
    ))
    toast.success("Coupon status updated")
  }

  const togglePromotionStatus = (id: string) => {
    setPromotions(promotions.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ))
    toast.success("Promotion status updated")
  }

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter(c => c.id !== id))
    toast.success("Coupon deleted")
  }

  const deletePromotion = (id: string) => {
    setPromotions(promotions.filter(p => p.id !== id))
    toast.success("Promotion deleted")
  }

  if (isLoading || isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage promotions, coupons, and store settings</p>
      </div>

      <Tabs defaultValue="coupons" className="space-y-6">
        <TabsList>
          <TabsTrigger value="coupons">Coupons</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="coupons" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Create Coupon */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New Coupon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateCoupon} className="space-y-4">
                  <div>
                    <Label htmlFor="code">Coupon Code</Label>
                    <Input
                      id="code"
                      value={couponForm.code}
                      onChange={(e) => setCouponForm({...couponForm, code: e.target.value.toUpperCase()})}
                      placeholder="SAVE20"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select value={couponForm.type} onValueChange={(value: "percentage" | "fixed") => setCouponForm({...couponForm, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        type="number"
                        value={couponForm.value}
                        onChange={(e) => setCouponForm({...couponForm, value: parseFloat(e.target.value)})}
                        placeholder={couponForm.type === "percentage" ? "10" : "100"}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minOrder">Min Order (₹)</Label>
                      <Input
                        id="minOrder"
                        type="number"
                        value={couponForm.minOrder}
                        onChange={(e) => setCouponForm({...couponForm, minOrder: parseFloat(e.target.value)})}
                        placeholder="500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="usageLimit">Usage Limit</Label>
                      <Input
                        id="usageLimit"
                        type="number"
                        value={couponForm.usageLimit}
                        onChange={(e) => setCouponForm({...couponForm, usageLimit: parseInt(e.target.value)})}
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="expiresAt">Expires At</Label>
                    <Input
                      id="expiresAt"
                      type="date"
                      value={couponForm.expiresAt}
                      onChange={(e) => setCouponForm({...couponForm, expiresAt: e.target.value})}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Create Coupon
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Coupon List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Active Coupons ({coupons.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {coupons.map((coupon) => (
                  <div key={coupon.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono">
                          {coupon.code}
                        </Badge>
                        <Badge variant={coupon.isActive ? "default" : "secondary"}>
                          {coupon.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Switch
                          checked={coupon.isActive}
                          onCheckedChange={() => toggleCouponStatus(coupon.id)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteCoupon(coupon.id)}
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        {coupon.type === "percentage" ? `${coupon.value}% off` : `₹${coupon.value} off`}
                        {coupon.minOrder > 0 && ` on orders above ₹${coupon.minOrder}`}
                      </p>
                      <p>Used: {coupon.usedCount}/{coupon.usageLimit} • Expires: {coupon.expiresAt}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Create Promotion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Create New Promotion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePromotion} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={promotionForm.title}
                      onChange={(e) => setPromotionForm({...promotionForm, title: e.target.value})}
                      placeholder="Holiday Sale"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={promotionForm.description}
                      onChange={(e) => setPromotionForm({...promotionForm, description: e.target.value})}
                      placeholder="Up to 50% off on all products"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={promotionForm.type} onValueChange={(value: "banner" | "popup" | "discount") => setPromotionForm({...promotionForm, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="banner">Banner</SelectItem>
                        <SelectItem value="popup">Popup</SelectItem>
                        <SelectItem value="discount">Discount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={promotionForm.startDate}
                        onChange={(e) => setPromotionForm({...promotionForm, startDate: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={promotionForm.endDate}
                        onChange={(e) => setPromotionForm({...promotionForm, endDate: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="targetUrl">Target URL (Optional)</Label>
                    <Input
                      id="targetUrl"
                      value={promotionForm.targetUrl}
                      onChange={(e) => setPromotionForm({...promotionForm, targetUrl: e.target.value})}
                      placeholder="/products?sale=true"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Create Promotion
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Promotion List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Active Promotions ({promotions.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {promotions.map((promotion) => (
                  <div key={promotion.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{promotion.title}</h4>
                      <div className="flex items-center gap-1">
                        <Badge variant={promotion.isActive ? "default" : "secondary"}>
                          {promotion.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Switch
                          checked={promotion.isActive}
                          onCheckedChange={() => togglePromotionStatus(promotion.id)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deletePromotion(promotion.id)}
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{promotion.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline">{promotion.type}</Badge>
                      <span>{promotion.startDate} - {promotion.endDate}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable to show maintenance page to users</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>New User Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new users to register</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send order confirmation emails</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Inventory Alerts</Label>
                  <p className="text-sm text-muted-foreground">Alert when stock is low</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}