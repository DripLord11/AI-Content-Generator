"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Sparkles,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Download,
  Eye,
  RefreshCw,
  Search,
  Filter,
  MoreVertical,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Plus,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useConfig } from "@/lib/config-context"

// Enhanced sample data for demonstration
const sampleProjects = [
  {
    id: "proj_1",
    customerName: "Sarah Johnson",
    customerCompany: "TechFlow Solutions",
    status: "completed",
    createdAt: "2024-01-10T10:00:00Z",
    deliveryDate: "2024-01-11T14:30:00Z",
    package: "Professional",
    revenue: 599,
    assetsGenerated: 12,
  },
  {
    id: "proj_2",
    customerName: "Michael Chen",
    customerCompany: "GrowthLabs",
    status: "processing",
    createdAt: "2024-01-14T09:00:00Z",
    package: "Premium",
    revenue: 999,
    assetsGenerated: 0,
  },
  {
    id: "proj_3",
    customerName: "Emily Rodriguez",
    customerCompany: "DataVault Inc",
    status: "pending",
    createdAt: "2024-01-15T08:30:00Z",
    package: "Essential",
    revenue: 299,
    assetsGenerated: 0,
  },
  {
    id: "proj_4",
    customerName: "James Wilson",
    customerCompany: "CloudScale",
    status: "completed",
    createdAt: "2024-01-08T11:00:00Z",
    deliveryDate: "2024-01-09T16:00:00Z",
    package: "Professional",
    revenue: 599,
    assetsGenerated: 12,
  },
  {
    id: "proj_5",
    customerName: "Lisa Park",
    customerCompany: "Innovate AI",
    status: "completed",
    createdAt: "2024-01-05T09:15:00Z",
    deliveryDate: "2024-01-06T11:00:00Z",
    package: "Premium",
    revenue: 999,
    assetsGenerated: 18,
  },
]

const sampleLeads = [
  {
    id: "lead_1",
    name: "Alex Thompson",
    email: "alex@company.com",
    company: "Innovate Corp",
    status: "new",
    source: "LinkedIn",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "lead_2",
    name: "Jessica Park",
    email: "jessica@techventures.io",
    company: "TechVentures",
    status: "contacted",
    source: "Website",
    createdAt: "2024-01-14T14:00:00Z",
  },
  {
    id: "lead_3",
    name: "David Kim",
    email: "david@startupxyz.com",
    company: "StartupXYZ",
    status: "qualified",
    source: "Referral",
    createdAt: "2024-01-12T09:15:00Z",
  },
  {
    id: "lead_4",
    name: "Rachel Green",
    email: "rachel@marketpro.io",
    company: "MarketPro",
    status: "new",
    source: "Google",
    createdAt: "2024-01-15T15:45:00Z",
  },
]

const stats = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Projects Completed",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Active Clients",
    value: "18",
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Avg. Turnaround",
    value: "18 hrs",
    change: "-15%",
    trend: "down",
    icon: Clock,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
  },
]

const recentActivity = [
  { action: "New project submitted", customer: "GrowthLabs", time: "2 hours ago", type: "project" },
  { action: "Lead qualified", customer: "StartupXYZ", time: "4 hours ago", type: "lead" },
  { action: "Project delivered", customer: "CloudScale", time: "6 hours ago", type: "completed" },
  { action: "Payment received", customer: "TechFlow Solutions", time: "8 hours ago", type: "payment" },
  { action: "New lead from LinkedIn", customer: "Alex Thompson", time: "12 hours ago", type: "lead" },
]

const performanceData = [
  { month: "Jan", projects: 24, revenue: 12450 },
  { month: "Dec", projects: 18, revenue: 9200 },
  { month: "Nov", projects: 21, revenue: 10800 },
]

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>
    case "processing":
      return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Processing</Badge>
    case "pending":
      return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pending</Badge>
    case "failed":
      return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Failed</Badge>
    case "new":
      return <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">New</Badge>
    case "contacted":
      return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Contacted</Badge>
    case "qualified":
      return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Qualified</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case "processing":
      return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
    case "pending":
      return <Clock className="w-4 h-4 text-amber-500" />
    case "failed":
      return <AlertCircle className="w-4 h-4 text-red-500" />
    default:
      return null
  }
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case "project":
      return <FileText className="w-4 h-4 text-blue-500" />
    case "lead":
      return <Users className="w-4 h-4 text-purple-500" />
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case "payment":
      return <DollarSign className="w-4 h-4 text-green-500" />
    default:
      return <Activity className="w-4 h-4 text-foreground/60" />
  }
}

export default function AdminPage() {
  const { config } = useConfig()
  const [activeTab, setActiveTab] = React.useState("overview")
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredProjects = sampleProjects.filter(
    (project) =>
      project.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.customerCompany.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredLeads = sampleLeads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalRevenue = sampleProjects.reduce((sum, p) => sum + p.revenue, 0)
  const completedProjects = sampleProjects.filter((p) => p.status === "completed").length
  const pendingProjects = sampleProjects.filter((p) => p.status === "pending" || p.status === "processing").length

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-muted/20 border-r border-border/50 p-6 hidden lg:flex flex-col">
        <Link href="/" className="flex items-center space-x-3 mb-10">
          <div className="bg-gradient-to-r from-primary to-secondary p-2.5 rounded-xl">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg text-foreground">{config.businessName}</span>
            <p className="text-xs text-foreground/50">Admin Dashboard</p>
          </div>
        </Link>

        <nav className="space-y-2 flex-1">
          {[
            { icon: LayoutDashboard, label: "Overview", value: "overview" },
            { icon: FileText, label: "Projects", value: "projects" },
            { icon: Users, label: "Leads", value: "leads" },
            { icon: BarChart3, label: "Analytics", value: "analytics" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.value
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-foreground/60 hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}

          <div className="pt-4 mt-4 border-t border-border/50">
            <Link
              href="/settings"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/60 hover:bg-muted hover:text-foreground transition-all"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </Link>
          </div>
        </nav>

        <div className="pt-4 border-t border-border/50 space-y-3">
          <Link href="/intake">
            <Button variant="glow" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Website
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "projects" && "Project Management"}
                {activeTab === "leads" && "Lead Management"}
                {activeTab === "analytics" && "Analytics"}
              </h1>
              <p className="text-foreground/60 text-sm mt-0.5">
                Welcome back! Here&apos;s your business at a glance.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64 bg-muted/50"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                            <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ color: stat.color.includes('green') ? '#22c55e' : stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('purple') ? '#a855f7' : '#f59e0b' }} />
                          </div>
                          <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-amber-500'}`}>
                            {stat.trend === 'up' ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4" />
                            )}
                            {stat.change}
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                          <p className="text-sm text-foreground/60 mt-1">{stat.title}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Projects */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Projects</CardTitle>
                        <CardDescription>Latest customer case studies</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("projects")}>
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleProjects.slice(0, 4).map((project) => (
                        <div
                          key={project.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            {getStatusIcon(project.status)}
                            <div>
                              <p className="font-medium text-foreground">{project.customerCompany}</p>
                              <p className="text-sm text-foreground/60">{project.customerName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">{project.package}</Badge>
                            {getStatusBadge(project.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Feed */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground">{activity.action}</p>
                            <p className="text-xs text-foreground/60 truncate">{activity.customer}</p>
                          </div>
                          <span className="text-xs text-foreground/40 whitespace-nowrap">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground/60">Conversion Rate</span>
                        <span className="text-2xl font-bold text-foreground">68%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-[68%] bg-gradient-to-r from-primary to-secondary rounded-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                        <div>
                          <p className="text-sm text-foreground/60">Avg. Project Value</p>
                          <p className="text-xl font-bold text-foreground">${(totalRevenue / sampleProjects.length).toFixed(0)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60">Repeat Clients</p>
                          <p className="text-xl font-bold text-foreground">42%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Link href="/intake">
                        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                          <FileText className="w-6 h-6 text-primary mb-2" />
                          <p className="font-medium text-foreground">New Project</p>
                          <p className="text-xs text-foreground/60">Start a case study</p>
                        </div>
                      </Link>
                      <Link href="/book">
                        <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 hover:bg-secondary/20 transition-colors cursor-pointer">
                          <Calendar className="w-6 h-6 text-secondary mb-2" />
                          <p className="font-medium text-foreground">Book Call</p>
                          <p className="text-xs text-foreground/60">Schedule meeting</p>
                        </div>
                      </Link>
                      <Link href="/settings">
                        <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-colors cursor-pointer">
                          <Settings className="w-6 h-6 text-accent mb-2" />
                          <p className="font-medium text-foreground">Settings</p>
                          <p className="text-xs text-foreground/60">Configure app</p>
                        </div>
                      </Link>
                      <div className="p-4 rounded-xl bg-muted/50 border border-border/50 hover:bg-muted transition-colors cursor-pointer">
                        <Download className="w-6 h-6 text-foreground/60 mb-2" />
                        <p className="font-medium text-foreground">Export Data</p>
                        <p className="text-xs text-foreground/60">Download CSV</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Projects</CardTitle>
                    <CardDescription>{filteredProjects.length} projects found</CardDescription>
                  </div>
                  <Link href="/intake">
                    <Button variant="glow">
                      <Plus className="w-4 h-4 mr-2" />
                      New Project
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Package</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Revenue</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Created</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-foreground/60">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project) => (
                        <tr key={project.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(project.status)}
                              <div>
                                <p className="font-medium text-foreground">{project.customerName}</p>
                                <p className="text-sm text-foreground/60">{project.customerCompany}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline">{project.package}</Badge>
                          </td>
                          <td className="py-4 px-4">{getStatusBadge(project.status)}</td>
                          <td className="py-4 px-4 font-medium text-foreground">${project.revenue}</td>
                          <td className="py-4 px-4 text-foreground/60">{formatDate(project.createdAt)}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {project.status === "completed" && (
                                <Button variant="ghost" size="icon">
                                  <Download className="w-4 h-4" />
                                </Button>
                              )}
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Leads Tab */}
          {activeTab === "leads" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Leads</CardTitle>
                    <CardDescription>{filteredLeads.length} leads found</CardDescription>
                  </div>
                  <Button variant="glow">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Lead
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Company</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Source</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Created</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-foreground/60">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-4 font-medium text-foreground">{lead.name}</td>
                          <td className="py-4 px-4 text-foreground/70">{lead.company}</td>
                          <td className="py-4 px-4">
                            <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                              {lead.email}
                            </a>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline">{lead.source}</Badge>
                          </td>
                          <td className="py-4 px-4">{getStatusBadge(lead.status)}</td>
                          <td className="py-4 px-4 text-foreground/60">{formatDate(lead.createdAt)}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {performanceData.map((data, index) => (
                        <div key={data.month}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-foreground/60">{data.month}</span>
                            <span className="font-medium">${data.revenue.toLocaleString()}</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(data.revenue / 15000) * 100}%` }}
                              transition={{ delay: index * 0.2 }}
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center py-8">
                      <div className="relative w-40 h-40">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="80" cy="80" r="60" fill="none" stroke="currentColor" strokeWidth="20" className="text-muted" />
                          <circle
                            cx="80"
                            cy="80"
                            r="60"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="20"
                            strokeDasharray={`${(completedProjects / sampleProjects.length) * 377} 377`}
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#6366f1" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold">{completedProjects}</span>
                          <span className="text-xs text-foreground/60">Completed</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary" />
                        <span>Completed ({completedProjects})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-muted" />
                        <span>Pending ({pendingProjects})</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Lead Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { source: "LinkedIn", count: 8, color: "bg-blue-500" },
                        { source: "Website", count: 5, color: "bg-purple-500" },
                        { source: "Referral", count: 4, color: "bg-green-500" },
                        { source: "Google", count: 3, color: "bg-amber-500" },
                      ].map((item) => (
                        <div key={item.source} className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="flex-1 text-foreground/80">{item.source}</span>
                          <span className="font-medium">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
