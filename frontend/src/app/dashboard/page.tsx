"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPinHouse, Users, CheckCircle, Clock, FileText, Trophy, LogOut, Plus, Briefcase, Calendar, BarChart3, CreditCard } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

interface User {
  id: string;
  name: string;
  email: string;
}

interface DashboardStats {
  totalLeads: number;
  activeLeads: number;
  todayFollowUps: number;
  dealsClosed: number;
  totalQuotations: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    activeLeads: 0,
    todayFollowUps: 0,
    dealsClosed: 0,
    totalQuotations: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        // Decode JWT token to get user info
        const payload = JSON.parse(atob(token.split(".")[1]));

        setUser({
          id: payload._id,
          name: payload.name,
          email: payload.email,
        });

        // Fetch real stats from backend
        await fetchDashboardStats();
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const fetchDashboardStats = async () => {
    try {
      // Set a timeout for API calls
      const timeout = 5000; // 5 seconds
      
      const fetchWithTimeout = (url: string, options: any) => {
        return Promise.race([
          fetch(url, options),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), timeout)
          )
        ]);
      };

      // Fetch leads count
      const leadsResponse = await fetchWithTimeout(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/leads`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }) as Response;
      
      if (leadsResponse.ok) {
        const leadsData = await leadsResponse.json();
        const totalLeads = leadsData.data?.length || 0;
        const activeLeads = leadsData.data?.filter((lead: any) => lead.status === 'active').length || 0;
        const dealsClosed = leadsData.data?.filter((lead: any) => lead.status === 'closed').length || 0;
        
        setStats(prev => ({ ...prev, totalLeads, activeLeads, dealsClosed }));
      }

      // Fetch other stats with fallback
      try {
        const followUpsResponse = await fetchWithTimeout(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/followups/today`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }) as Response;
        
        if (followUpsResponse.ok) {
          const followUpsData = await followUpsResponse.json();
          setStats(prev => ({ ...prev, todayFollowUps: followUpsData.data?.length || 0 }));
        }
      } catch (e) { /* Ignore follow-ups error */ }

      try {
        const quotationsResponse = await fetchWithTimeout(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/quotations`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }) as Response;
        
        if (quotationsResponse.ok) {
          const quotationsData = await quotationsResponse.json();
          setStats(prev => ({ ...prev, totalQuotations: quotationsData.data?.length || 0 }));
        }
      } catch (e) { /* Ignore quotations error */ }

    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      // Keep default values on error
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-lg text-base-content">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      <header className="bg-base-100 shadow-lg border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: "#166534" }}>
                <MapPinHouse size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-base-content">
                DealSense
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="text-right">
                <p className="text-sm text-base-content/70">Welcome back,</p>
                <p className="font-semibold text-base-content">{user?.name}</p>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-error btn-sm flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-base-content">Dashboard Overview</h2>
            <p className="text-sm text-base-content/70">Track your real estate operations at a glance</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-12">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-32">
              <div className="card-body p-6 h-full flex items-center">
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)" }}>
                      <Users size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-5 flex-1">
                    <p className="text-sm font-medium truncate text-base-content/70">Total Leads</p>
                    <p className="text-2xl font-bold text-base-content">{stats.totalLeads}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-32">
              <div className="card-body p-6 h-full flex items-center">
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #166534 0%, #14532D 100%)" }}>
                      <CheckCircle size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-5 flex-1">
                    <p className="text-sm font-medium truncate text-base-content/70">Active Leads</p>
                    <p className="text-2xl font-bold text-base-content">{stats.activeLeads}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-32">
              <div className="card-body p-6 h-full flex items-center">
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)" }}>
                      <Clock size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-5 flex-1">
                    <p className="text-sm font-medium truncate text-base-content/70">Follow-ups Today</p>
                    <p className="text-2xl font-bold text-base-content">{stats.todayFollowUps}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-32">
              <div className="card-body p-6 h-full flex items-center">
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)" }}>
                      <FileText size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-5 flex-1">
                    <p className="text-sm font-medium truncate text-base-content/70">Total Quotations</p>
                    <p className="text-2xl font-bold text-base-content">{stats.totalQuotations}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-32">
              <div className="card-body p-6 h-full flex items-center">
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #10B981 0%, #059669 100%)" }}>
                      <Trophy size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-5 flex-1">
                    <p className="text-sm font-medium truncate text-base-content/70">Deals Closed</p>
                    <p className="text-2xl font-bold text-base-content">{stats.dealsClosed}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-base-content">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Link href="/leads/new" className="group">
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-50">
                  <div className="card-body p-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: "linear-gradient(135deg, #166534 0%, #14532D 100%)" }}>
                      <Plus size={24} className="text-white" />
                    </div>
                    <h4 className="font-semibold mb-2 text-base-content">Add New Lead</h4>
                    <p className="text-sm text-base-content/70">Create a new lead entry</p>
                  </div>
                </div>
              </Link>

              <Link href="/leads" className="group">
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-50">
                  <div className="card-body p-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)" }}>
                      <Users size={24} className="text-white" />
                    </div>
                    <h4 className="font-semibold mb-2 text-base-content">View All Leads</h4>
                    <p className="text-sm text-base-content/70">Manage existing leads</p>
                  </div>
                </div>
              </Link>

              <Link href="/followups" className="group">
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-50">
                  <div className="card-body p-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)" }}>
                      <Clock size={24} className="text-white" />
                    </div>
                    <h4 className="font-semibold mb-2 text-base-content">Today's Follow-ups</h4>
                    <p className="text-sm text-base-content/70">View and manage follow-ups</p>
                  </div>
                </div>
              </Link>

              <Link href="/quotations" className="group">
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-50">
                  <div className="card-body p-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)" }}>
                      <FileText size={24} className="text-white" />
                    </div>
                    <h4 className="font-semibold mb-2 text-base-content">View Quotations</h4>
                    <p className="text-sm text-base-content/70">Manage property quotations</p>
                  </div>
                </div>
              </Link>

              <Link href="/payments" className="group">
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-50">
                  <div className="card-body p-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)" }}>
                      <CreditCard size={24} className="text-white" />
                    </div>
                    <h4 className="font-semibold mb-2 text-base-content">Payment Schedules</h4>
                    <p className="text-sm text-base-content/70">Track EMI and payments</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}