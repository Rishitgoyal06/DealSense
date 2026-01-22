"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      // Fetch leads count
      const leadsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/leads`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const leadsData = await leadsResponse.json();
      const totalLeads = leadsData.data?.length || 0;
      const activeLeads = leadsData.data?.filter((lead: any) => lead.status === 'active').length || 0;

      // Fetch today's follow-ups count
      const followUpsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/followups/today`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const followUpsData = await followUpsResponse.json();
      const todayFollowUps = followUpsData.data?.length || 0;

      // Fetch quotations count
      const quotationsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/quotations`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const quotationsData = await quotationsResponse.json();
      const totalQuotations = quotationsData.data?.length || 0;

      // Count closed deals (leads with status 'closed')
      const dealsClosed = leadsData.data?.filter((lead: any) => lead.status === 'closed').length || 0;

      setStats({
        totalLeads,
        activeLeads,
        todayFollowUps,
        dealsClosed,
        totalQuotations
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      // Keep default values on error
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-bold">D</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                DealSense
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Welcome back,</p>
                <p className="font-semibold text-gray-900">{user?.name}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-32">
              <div className="p-6 h-full flex items-center">
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 616 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Leads
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900">
                        {stats.totalLeads}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-32">
              <div className="p-6 h-full flex items-center">
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Leads
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900">
                        {stats.activeLeads}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-32">
              <div className="p-6 h-full flex items-center">
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Follow-ups Today
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900">
                        {stats.todayFollowUps}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-32">
              <div className="p-6 h-full flex items-center">
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Quotations
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900">
                        {stats.totalQuotations}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-32">
              <div className="p-6 h-full flex items-center">
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Deals Closed
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900">
                        {stats.dealsClosed}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Quick Actions
              </h2>
              <p className="text-gray-600">Manage your real estate operations efficiently</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              <Link href="/leads/new">
                <button className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full text-left border border-gray-100 transform hover:-translate-y-2 hover:scale-105 h-48">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    Add New Lead
                  </h3>
                  <p className="text-gray-600 text-sm">Create a new lead entry</p>
                </button>
              </Link>
              <Link href="/leads">
                <button className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full text-left border border-gray-100 transform hover:-translate-y-2 hover:scale-105 h-48">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    View All Leads
                  </h3>
                  <p className="text-gray-600 text-sm">Manage existing leads</p>
                </button>
              </Link>
              <Link href="/followups">
                <button className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full text-left border border-gray-100 transform hover:-translate-y-2 hover:scale-105 h-48">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    Today's Follow-ups
                  </h3>
                  <p className="text-gray-600 text-sm">View and manage follow-ups</p>
                </button>
              </Link>
              <Link href="/quotations">
                <button className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full text-left border border-gray-100 transform hover:-translate-y-2 hover:scale-105 h-48">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    View Quotations
                  </h3>
                  <p className="text-gray-600 text-sm">Manage property quotations</p>
                </button>
              </Link>
              <Link href="/payments">
                <button className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full text-left border border-gray-100 transform hover:-translate-y-2 hover:scale-105 h-48">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    Payment Schedules
                  </h3>
                  <p className="text-gray-600 text-sm">Track EMI and payments</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}