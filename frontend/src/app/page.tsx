"use client";

import { motion } from "motion/react";
import {
  BarChart3,
  CircleCheck,
  Clock,
  TabletSmartphone,
  Brain,
  TriangleAlert,
  MapPinHouse,
  Users,
  Calendar,
  FileText,
  CreditCard,
  TrendingUp,
  Star,
  Quote,
} from "lucide-react";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSectionOne />
      <ProblemSection />
      <SolutionSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export function HeroSectionOne() {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col"
      style={{ backgroundColor: "#FAFBFC" }}
    >
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="px-6 py-20 md:py-32">
            <h1
              className="mx-auto max-w-4xl text-center text-5xl font-bold md:text-6xl lg:text-7xl mb-8 leading-tight"
              style={{ color: "#0F172A" }}
            >
              Manage Real Estate Deals Without
              <span style={{ color: "#166534" }}> WhatsApp Chaos</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto max-w-2xl text-center text-lg mb-12 leading-relaxed"
              style={{ color: "#64748B" }}
            >
              Streamline your real estate operations with intelligent lead
              tracking, automated follow-ups, and comprehensive deal management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            >
              <a
                href="/login"
                className="w-full sm:w-auto px-8 py-4 font-semibold rounded-md transition-all duration-200 text-center shadow-sm"
                style={{
                  backgroundColor: "#166534",
                  color: "#FFFFFF",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#14532D";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#166534";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Start Free Trial
              </a>
              <a
                href="/register"
                className="w-full sm:w-auto px-8 py-4 font-semibold rounded-md transition-all duration-200 text-center"
                style={{
                  border: "1px solid #CBD5E1",
                  color: "#475569",
                  backgroundColor: "#FFFFFF",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F8FAFC";
                  e.currentTarget.style.borderColor = "#94A3B8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.borderColor = "#CBD5E1";
                }}
              >
                Schedule Demo
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            >
              <div
                className="p-8 rounded-lg border"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: "#F1F5F9" }}
                >
                  <BarChart3 className="w-6 h-6" style={{ color: "#166534" }} />
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: "#0F172A" }}
                >
                  Lead Management
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#64748B" }}
                >
                  Centralized lead tracking with intelligent scoring and
                  automated qualification workflows.
                </p>
              </div>

              <div
                className="p-8 rounded-lg border"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: "#F1F5F9" }}
                >
                  <Clock color="#166534" />
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: "#0F172A" }}
                >
                  Smart Follow-ups
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#64748B" }}
                >
                  Automated scheduling and reminders ensure no opportunity falls
                  through the cracks.
                </p>
              </div>

              <div
                className="p-8 rounded-lg border"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: "#F1F5F9" }}
                >
                  <CircleCheck color="#166534" />
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: "#0F172A" }}
                >
                  Deal Intelligence
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#64748B" }}
                >
                  Advanced analytics and insights to optimize your sales process
                  and close more deals.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="rounded-lg border shadow-sm overflow-hidden"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
            >
              <img
                src="/Dashboard.png"
                alt="DealSense Dashboard Preview"
                className="w-full h-auto object-contain scale-110 sm:scale-100"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Navbar = () => {
  return (
    <nav
      className="flex w-full items-center justify-between px-6 py-6 border-b"
      style={{ borderColor: "#E2E8F0", backgroundColor: "#FFFFFF" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-md flex items-center justify-center"
          style={{ backgroundColor: "#166534" }}
        >
          <MapPinHouse size={28} color="#FFFFFF" />
        </div>
        <h1
          className="text-xl font-bold md:text-2xl"
          style={{ color: "#0F172A" }}
        >
          DealSense
        </h1>
      </div>
      <a
        href="/login"
        className="px-6 py-2 font-medium rounded-md transition-all duration-200"
        style={{
          backgroundColor: "#166534",
          color: "#FFFFFF",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#14532D";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#166534";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Login
      </a>
    </nav>
  );
};

const ProblemSection = () => {
  return (
    <div className="py-20 px-6" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
            The real problems in real estate operations
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div
            className="p-8 rounded-lg border text-center"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "#FEF2F2" }}
            >
              <TabletSmartphone size={32} color="#166534" />
            </div>
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#0F172A" }}
            >
              Everything on WhatsApp
            </h3>
            <p
              className="text-base leading-relaxed"
              style={{ color: "#64748B" }}
            >
              Quotations, follow-ups, and responses get lost in endless chat
              threads
            </p>
          </div>

          <div
            className="p-8 rounded-lg border text-center"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "#FEF2F2" }}
            >
              <Brain size={32} color="#166534" />
            </div>
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#0F172A" }}
            >
              Manual memory & Excel sheets
            </h3>
            <p
              className="text-base leading-relaxed"
              style={{ color: "#64748B" }}
            >
              Hard to track who to call and when, leading to missed
              opportunities
            </p>
          </div>

          <div
            className="p-8 rounded-lg border text-center"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "#FEF2F2" }}
            >
              <TriangleAlert size={32} color="#166534" />
            </div>
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#0F172A" }}
            >
              Missed EMI & payment delays
            </h3>
            <p
              className="text-base leading-relaxed"
              style={{ color: "#64748B" }}
            >
              Causes panic and last-minute issues that damage client
              relationships
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SolutionSection = () => {
  return (
    <div
      className="py-20 px-6"
      style={{
        background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
            DealSense brings clarity to your daily workflow
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div
            className="flex items-center gap-6 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
              border: "1px solid #E2E8F0",
            }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #166534 0%, #059669 100%)",
                boxShadow: "0 4px 14px 0 rgba(22, 101, 52, 0.25)",
              }}
            >
              <Users size={24} color="#FFFFFF" />
            </div>
            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0F172A" }}
              >
                Centralized lead management
              </h3>
              <p className="text-base" style={{ color: "#64748B" }}>
                All your leads in one place with intelligent scoring and status
                tracking
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-6 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
              border: "1px solid #E2E8F0",
            }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.25)",
              }}
            >
              <Calendar size={24} color="#FFFFFF" />
            </div>
            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0F172A" }}
              >
                Smart follow-up scheduling
              </h3>
              <p className="text-base" style={{ color: "#64748B" }}>
                Automated reminders and scheduling so you never miss a follow-up
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-6 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
              border: "1px solid #E2E8F0",
            }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                boxShadow: "0 4px 14px 0 rgba(245, 158, 11, 0.25)",
              }}
            >
              <FileText size={24} color="#FFFFFF" />
            </div>
            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0F172A" }}
              >
                Broker quotation tracking
              </h3>
              <p className="text-base" style={{ color: "#64748B" }}>
                Track quotations sent to customers and their responses in
                real-time
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-6 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
              border: "1px solid #E2E8F0",
            }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                boxShadow: "0 4px 14px 0 rgba(239, 68, 68, 0.25)",
              }}
            >
              <CreditCard size={24} color="#FFFFFF" />
            </div>
            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0F172A" }}
              >
                EMI & payment risk alerts
              </h3>
              <p className="text-base" style={{ color: "#64748B" }}>
                Proactive alerts for upcoming payments and potential defaults
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-6 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
              border: "1px solid #E2E8F0",
            }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                boxShadow: "0 4px 14px 0 rgba(139, 92, 246, 0.25)",
              }}
            >
              <TrendingUp size={24} color="#FFFFFF" />
            </div>
            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0F172A" }}
              >
                Daily action-based dashboard
              </h3>
              <p className="text-base" style={{ color: "#64748B" }}>
                Clear daily priorities and actionable insights to maximize
                productivity
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "DealSense completely transformed how I manage my leads. I went from losing 30% of potential deals to closing 85% more transactions.",
      name: "Rajesh Sharma",
      title: "Senior Real Estate Broker, Mumbai",
    },
    {
      quote: "Before DealSense, I was managing everything on WhatsApp and Excel. Now I have complete visibility into my pipeline.",
      name: "Priya Kapoor",
      title: "Real Estate Consultant, Delhi",
    },
    {
      quote: "The quotation tracking feature saved my business. My conversion rate doubled with DealSense.",
      name: "Amit Mehta",
      title: "Property Dealer, Bangalore",
    },
    {
      quote: "DealSense helped me organize my entire business. The payment alerts saved me from multiple defaults.",
      name: "Sunita Gupta",
      title: "Real Estate Agent, Pune",
    },
    {
      quote: "My lead conversion improved by 60% and I never miss important follow-ups anymore.",
      name: "Vikram Singh",
      title: "Property Consultant, Gurgaon",
    },
    {
      quote: "The best investment I made for my real estate business. DealSense keeps me organized.",
      name: "Neha Agarwal",
      title: "Real Estate Broker, Hyderabad",
    },
  ];

  return (
    <div className="py-20 px-6" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
            What our customers say
          </h2>
          <p className="text-lg" style={{ color: "#64748B" }}>
            Real estate professionals trust DealSense to grow their business
          </p>
        </motion.div>
        <InfiniteMovingCards items={testimonials} direction="right" speed="normal" />
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  return (
    <div
      className="py-20 px-6"
      style={{
        background: "linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
            How it works
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 items-stretch"
        >
          <div className="text-center flex flex-col">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, #166534 0%, #14532D 100%)",
                boxShadow: "0 8px 25px -8px rgba(22, 101, 52, 0.5)",
              }}
            >
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <div
              className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex-1 flex flex-col"
              style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
                border: "1px solid #CBD5E1",
              }}
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#0F172A" }}
              >
                Add a lead
              </h3>
              <p className="text-sm flex-1" style={{ color: "#64748B" }}>
                Capture lead details and preferences with intelligent categorization
              </p>
            </div>
          </div>

          <div className="text-center flex flex-col">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                boxShadow: "0 8px 25px -8px rgba(59, 130, 246, 0.5)",
              }}
            >
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <div
              className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex-1 flex flex-col"
              style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
                border: "1px solid #CBD5E1",
              }}
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#0F172A" }}
              >
                Schedule follow-ups
              </h3>
              <p className="text-sm flex-1" style={{ color: "#64748B" }}>
                Set automated reminders and track all customer interactions
              </p>
            </div>
          </div>

          <div className="text-center flex flex-col">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                boxShadow: "0 8px 25px -8px rgba(245, 158, 11, 0.5)",
              }}
            >
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <div
              className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex-1 flex flex-col"
              style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
                border: "1px solid #CBD5E1",
              }}
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#0F172A" }}
              >
                Track quotations & responses
              </h3>
              <p className="text-sm flex-1" style={{ color: "#64748B" }}>
                Monitor customer interest and feedback in real-time
              </p>
            </div>
          </div>

          <div className="text-center flex flex-col">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                boxShadow: "0 8px 25px -8px rgba(139, 92, 246, 0.5)",
              }}
            >
              <span className="text-white font-bold text-xl">4</span>
            </div>
            <div
              className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex-1 flex flex-col"
              style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
                border: "1px solid #CBD5E1",
              }}
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#0F172A" }}
              >
                Monitor payments & risks
              </h3>
              <p className="text-sm flex-1" style={{ color: "#64748B" }}>
                Stay ahead of payment schedules and potential defaults
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CTASection = () => {
  return (
    <div
      className="py-20 px-6"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-8" style={{ color: "#FFFFFF" }}>
            Stop managing deals in your head.
          </h2>
          <a
            href="/dashboard"
            className="inline-block px-8 py-4 font-semibold rounded-md transition-all duration-200 shadow-xl"
            style={{
              background: "linear-gradient(135deg, #166534 0%, #14532D 100%)",
              color: "#FFFFFF",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #14532D 0%, #166534 100%)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #166534 0%, #14532D 100%)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
            }}
          >
            Go to Dashboard
          </a>
        </motion.div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer
      className="py-12 px-6"
      style={{ backgroundColor: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center"
            style={{ backgroundColor: "#166534" }}
          >
            <span
              className="w-10 h-9 rounded-md flex items-center justify-center"
              style={{ backgroundColor: "#166534" }}
            >
              <MapPinHouse size={24} color="#FFFFFF" />
            </span>
          </div>
          <h3 className="text-xl font-bold" style={{ color: "#0F172A" }}>
            DealSense
          </h3>
        </div>
        <p className="text-base mb-6" style={{ color: "#64748B" }}>
          A real estate workflow management system
        </p>
        <div
          className="flex items-center justify-center gap-6 text-sm"
          style={{ color: "#64748B" }}
        >
          <a
            href="https://github.com/Rishitgoyal06/DealSense"
            className="hover:underline transition-colors duration-200"
            style={{ color: "#166534" }}
            target="_blank"
          >
            GitHub
          </a>
          <span>Built by Rishit Goyal</span>
        </div>
      </div>
    </footer>
  );
};
