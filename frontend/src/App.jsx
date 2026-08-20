import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Calendar, ShieldCheck, Sparkles, ArrowRight, User,
  Clock, CheckCircle2, Zap, TrendingUp, ChevronRight, X, Mail, Lock,
  LayoutDashboard, Layers, Activity, Check, PlusCircle, Star, Menu
} from 'lucide-react';

export default function App() {
  // Page Navigation State (0: Home, 1: Services, 2: Dashboard)
  const [activePage, setActivePage] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Auth & User State
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [userToken, setUserToken] = useState(localStorage.getItem('token') || null);

  // Mock Booked Data for Dashboard Page
  const [userBookings, setUserBookings] = useState([
    { id: 'BK-9021', service: 'Executive Consultation', date: '2026-08-25', time: '10:00 AM', status: 'Confirmed', price: '$120' },
    { id: 'BK-4412', service: 'Architecture Review', date: '2026-08-28', time: '02:00 PM', status: 'Pending', price: '$90' }
  ]);

  const services = [
    { 
      name: "Executive Consultation", 
      duration: "45 mins", 
      price: "$120", 
      tags: ["Popular", "Priority"],
      description: "One-on-one high-level business strategy and technical roadmapping tailored for scaling platforms."
    },
    { 
      name: "Strategy & Tech Planning", 
      duration: "60 mins", 
      price: "$180", 
      tags: ["1-on-1", "In-depth"],
      description: "Comprehensive stack evaluation, backend architectural design, and modern database optimization."
    },
    { 
      name: "Architecture Review", 
      duration: "30 mins", 
      price: "$90", 
      tags: ["Express"],
      description: "Rapid code review, API performance audit, and frontend responsiveness diagnostic session."
    }
  ];

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const endpoint = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/register';

    try {
      const res = await axios.post(endpoint, formData);
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        setUserToken(res.data.token);
        setMessage({ type: 'success', text: 'Login successful!' });
      } else {
        setMessage({ type: 'success', text: 'Account created! Please login now.' });
        setIsLogin(true);
      }
      setTimeout(() => {
        if (isLogin) setIsAuthOpen(false);
        setMessage({ type: '', text: '' });
      }, 1500);
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Authentication error. Check backend server.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserToken(null);
    setActivePage(0);
    setMobileMenuOpen(false);
  };

  const handleBookingConfirm = () => {
    setBookingSuccess(true);
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      service: services[selectedTab].name,
      date: new Date().toISOString().split('T')[0],
      time: '02:00 PM',
      status: 'Confirmed',
      price: services[selectedTab].price
    };
    
    setTimeout(() => {
      setUserBookings([newBooking, ...userBookings]);
      setBookingSuccess(false);
      setIsBookingOpen(false);
      setActivePage(2);
    }, 1800);
  };

  const navToPage = (pageIndex) => {
    setActivePage(pageIndex);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">

      {/* Dynamic Background Mesh Grids & Neon Glow Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 to-pink-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Responsive Header Navbar */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-40">
        <div className="backdrop-blur-xl bg-slate-900/50 border border-slate-800/80 shadow-2xl shadow-indigo-950/40 rounded-2xl px-5 py-3.5 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navToPage(0)}>
            <div className="p-2 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg shadow-indigo-500/30">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="font-extrabold text-lg md:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Bookify<span className="text-indigo-400">.io</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80 text-sm font-medium">
            <button
              onClick={() => navToPage(0)}
              className={`px-4 py-1.5 rounded-lg transition-all ${activePage === 0 ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-white"}`}
            >
              Overview
            </button>
            <button
              onClick={() => navToPage(1)}
              className={`px-4 py-1.5 rounded-lg transition-all ${activePage === 1 ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-white"}`}
            >
              Services & Plans
            </button>
            <button
              onClick={() => navToPage(2)}
              className={`px-4 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${activePage === 2 ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-white"}`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>User Portal</span>
            </button>
          </div>

          {/* Controls & Mobile Hamburger Toggle */}
          <div className="flex items-center space-x-2">
            {userToken ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 md:px-4 md:py-2 text-xs font-semibold bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/20 transition-all"
              >
                Logout
              </button>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={() => { setIsLogin(true); setIsAuthOpen(true); }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setIsLogin(false); setIsAuthOpen(true); }}
                  className="px-4 py-1.5 text-xs font-bold bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-300 hover:text-white bg-slate-800/60 rounded-xl border border-slate-700/60"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 p-4 bg-slate-900/95 border border-slate-800 backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col space-y-2 text-sm font-medium"
            >
              <button
                onClick={() => navToPage(0)}
                className={`w-full py-2.5 px-4 text-left rounded-xl ${activePage === 0 ? "bg-indigo-600 text-white" : "text-slate-300 bg-slate-950/50"}`}
              >
                Overview
              </button>
              <button
                onClick={() => navToPage(1)}
                className={`w-full py-2.5 px-4 text-left rounded-xl ${activePage === 1 ? "bg-indigo-600 text-white" : "text-slate-300 bg-slate-950/50"}`}
              >
                Services & Plans
              </button>
              <button
                onClick={() => navToPage(2)}
                className={`w-full py-2.5 px-4 text-left rounded-xl flex items-center justify-between ${activePage === 2 ? "bg-indigo-600 text-white" : "text-slate-300 bg-slate-950/50"}`}
              >
                <span>User Portal</span>
                <LayoutDashboard className="w-4 h-4" />
              </button>

              {!userToken && (
                <div className="pt-2 flex gap-2 border-t border-slate-800/80">
                  <button
                    onClick={() => { setIsLogin(true); setIsAuthOpen(true); setMobileMenuOpen(false); }}
                    className="flex-1 py-2 text-xs font-semibold bg-slate-800 rounded-xl text-slate-200"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setIsLogin(false); setIsAuthOpen(true); setMobileMenuOpen(false); }}
                    className="flex-1 py-2 text-xs font-bold bg-indigo-600 rounded-xl text-white"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Render Dynamic Pages with Framer Motion Page Transitions */}
      <AnimatePresence mode="wait">
        
        {/* PAGE 1: HOME / OVERVIEW */}
        {activePage === 0 && (
          <motion.main
            key="page-home"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="relative pt-36 md:pt-40 pb-20 px-4 md:px-6 max-w-7xl mx-auto flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-indigo-400 text-xs font-semibold mb-6 md:mb-8 shadow-inner backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                Next-Gen Automated Booking System
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight max-w-5xl leading-[1.1]">
              Schedule Appointments <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Without the Friction.
              </span>
            </h1>

            <p className="mt-6 md:mt-8 text-slate-400 text-sm md:text-xl max-w-2xl font-normal leading-relaxed">
              Elevate your business with real-time slot synchronization, frictionless payments, and an ultra-responsive client booking experience.
            </p>

            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => navToPage(1)}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-semibold text-sm md:text-base rounded-2xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 flex items-center justify-center space-x-3 transition-all"
              >
                <span>Explore Services & Book</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Live Interactive Booking Component */}
            <div className="mt-16 md:mt-20 w-full max-w-4xl backdrop-blur-2xl bg-slate-900/50 border border-slate-800/80 rounded-3xl p-5 md:p-8 shadow-2xl shadow-indigo-950/50 text-left">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                <div>
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">Interactive Component</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-1">Live Service Selection</h3>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedTab(index)}
                    className={`cursor-pointer p-4 md:p-5 rounded-2xl border transition-all ${selectedTab === index
                        ? "bg-gradient-to-b from-indigo-950/60 to-slate-900 border-indigo-500/80 shadow-lg shadow-indigo-500/10 scale-[1.01]"
                        : "bg-slate-950/40 border-slate-800/80 hover:border-slate-700"
                      }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-lg font-bold text-white">{service.price}</span>
                      <div className="flex space-x-1">
                        {service.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h4 className="font-semibold text-slate-100 text-sm md:text-base">{service.name}</h4>
                    <div className="flex items-center text-xs text-slate-400 mt-2 space-x-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3 text-xs md:text-sm text-slate-400 w-full sm:w-auto">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <span>Selected: <strong className="text-white">{services[selectedTab].name}</strong></span>
                </div>
                <button
                  onClick={() => {
                    if (!userToken) {
                      setIsLogin(true);
                      setIsAuthOpen(true);
                    } else {
                      setIsBookingOpen(true);
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-medium text-xs md:text-sm rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-indigo-500/20"
                >
                  <span>Reserve Slot Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modern Feature Cards */}
            <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left w-full">
              <div className="p-6 md:p-8 bg-slate-900/60 border border-slate-800/80 rounded-3xl backdrop-blur-xl">
                <div className="p-3 w-fit bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-indigo-400 mb-5">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-white">Real-Time Sync</h3>
                <p className="mt-2 text-slate-400 text-xs md:text-sm leading-relaxed">
                  Instantaneous slot locking preventing double-bookings with instant state synchronization.
                </p>
              </div>

              <div className="p-6 md:p-8 bg-slate-900/60 border border-slate-800/80 rounded-3xl backdrop-blur-xl">
                <div className="p-3 w-fit bg-purple-500/10 border border-purple-500/30 rounded-2xl text-purple-400 mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-white">JWT Protected</h3>
                <p className="mt-2 text-slate-400 text-xs md:text-sm leading-relaxed">
                  Protected with JWT security tokens, bcrypt password hashing, and encrypted DB connections.
                </p>
              </div>

              <div className="p-6 md:p-8 bg-slate-900/60 border border-slate-800/80 rounded-3xl backdrop-blur-xl">
                <div className="p-3 w-fit bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400 mb-5">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-white">Client Portal</h3>
                <p className="mt-2 text-slate-400 text-xs md:text-sm leading-relaxed">
                  Dedicated portal to view upcoming slots, active sessions, and direct reservation details.
                </p>
              </div>
            </div>
          </motion.main>
        )}

        {/* PAGE 2: SERVICES & PRICING PAGE */}
        {activePage === 1 && (
          <motion.main
            key="page-services"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="relative pt-32 md:pt-36 pb-20 px-4 md:px-6 max-w-7xl mx-auto flex flex-col items-center text-center"
          >
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
              Full Catalogue
            </span>
            <h2 className="text-3xl md:text-6xl font-black text-white mt-4 tracking-tight">
              Services & Pricing Plans
            </h2>
            <p className="mt-3 text-slate-400 text-sm md:text-base max-w-xl">
              Choose the right consulting or architecture execution model for your business.
            </p>

            <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full text-left">
              {services.map((srv, idx) => (
                <div
                  key={idx}
                  className="p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-indigo-400">
                        <Layers className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <span className="text-2xl font-black text-white">{srv.price}</span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{srv.name}</h3>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6">{srv.description}</p>

                    <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-indigo-400" />
                        <span>Duration: {srv.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-indigo-400" />
                        <span>Instant Email Confirmation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-indigo-400" />
                        <span>Direct 1-on-1 Video Sync</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTab(idx);
                      if (!userToken) {
                        setIsLogin(true);
                        setIsAuthOpen(true);
                      } else {
                        setIsBookingOpen(true);
                      }
                    }}
                    className="mt-8 w-full py-3 bg-slate-800 hover:bg-indigo-600 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md"
                  >
                    <span>Book This Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.main>
        )}

        {/* PAGE 3: USER DASHBOARD PORTAL PAGE */}
        {activePage === 2 && (
          <motion.main
            key="page-dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="relative pt-32 md:pt-36 pb-20 px-4 md:px-6 max-w-7xl mx-auto w-full text-left"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 md:pb-8 border-b border-slate-800/80">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">Client Control Center</span>
                <h2 className="text-2xl md:text-5xl font-black text-white mt-1">
                  User Dashboard
                </h2>
              </div>
              <button
                onClick={() => {
                  if (!userToken) setIsAuthOpen(true);
                  else setIsBookingOpen(true);
                }}
                className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Booking</span>
              </button>
            </div>

            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <div className="p-5 md:p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-xl">
                <span className="text-slate-400 text-xs uppercase font-semibold">Total Reserved Slots</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl md:text-3xl font-black text-white">{userBookings.length}</span>
                  <Activity className="w-6 h-6 text-indigo-400" />
                </div>
              </div>

              <div className="p-5 md:p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-xl">
                <span className="text-slate-400 text-xs uppercase font-semibold">Authentication Status</span>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs md:text-sm font-bold ${userToken ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {userToken ? 'Active Session (JWT)' : 'Guest Mode'}
                  </span>
                  <ShieldCheck className="w-6 h-6 text-indigo-400" />
                </div>
              </div>

              <div className="p-5 md:p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-xl">
                <span className="text-slate-400 text-xs uppercase font-semibold">Client Tier</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs md:text-sm font-bold text-indigo-300">Priority Executive</span>
                  <Star className="w-6 h-6 text-amber-400" />
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-10 bg-slate-900/50 border border-slate-800/80 rounded-3xl p-4 md:p-6 backdrop-blur-xl shadow-2xl">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Your Scheduled Appointments</h3>

              {userBookings.length === 0 ? (
                <p className="text-slate-400 text-xs md:text-sm py-8 text-center">No active bookings found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs md:text-sm text-slate-300 min-w-[500px]">
                    <thead className="bg-slate-950/80 text-[10px] md:text-xs uppercase text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-3 md:px-4 font-semibold">Booking ID</th>
                        <th className="py-3 px-3 md:px-4 font-semibold">Service Name</th>
                        <th className="py-3 px-3 md:px-4 font-semibold">Date & Time</th>
                        <th className="py-3 px-3 md:px-4 font-semibold">Amount</th>
                        <th className="py-3 px-3 md:px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {userBookings.map((b, i) => (
                        <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3.5 px-3 md:px-4 font-mono text-xs text-indigo-400">{b.id}</td>
                          <td className="py-3.5 px-3 md:px-4 font-semibold text-white">{b.service}</td>
                          <td className="py-3.5 px-3 md:px-4 text-xs text-slate-400">{b.date} at {b.time}</td>
                          <td className="py-3.5 px-3 md:px-4 font-bold text-white">{b.price}</td>
                          <td className="py-3.5 px-3 md:px-4">
                            <span className={`text-[10px] md:text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                              b.status === 'Confirmed' 
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.main>
        )}

      </AnimatePresence>

      {/* MODALS (Slot Booking & Auth) */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl md:text-2xl font-bold text-white">Confirm Booking</h3>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Select slot for <span className="text-indigo-400 font-semibold">{services[selectedTab].name}</span>
              </p>

              {bookingSuccess ? (
                <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-center font-medium text-xs md:text-sm">
                  ✓ Slot Reserved! Redirecting...
                </div>
              ) : (
                <div className="mt-6 space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">Select Date</label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">Select Time Slot</label>
                    <select className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500">
                      <option>10:00 AM - 10:45 AM</option>
                      <option>02:00 PM - 02:45 PM</option>
                      <option>05:00 PM - 05:45 PM</option>
                    </select>
                  </div>

                  <button
                    onClick={handleBookingConfirm}
                    className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-xs md:text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all mt-4"
                  >
                    Confirm & Reserve ({services[selectedTab].price})
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAuthOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setIsAuthOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl md:text-2xl font-bold text-white">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h3>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                {isLogin ? "Enter your credentials to access Bookify" : "Start managing appointments in seconds"}
              </p>

              {message.text && (
                <div className={`mt-4 p-3 rounded-xl text-xs font-medium border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4 text-left">
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-xs md:text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all mt-2"
                >
                  {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
                </button>
              </form>

              <div className="mt-6 text-center text-xs text-slate-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => { setIsLogin(!isLogin); setMessage({ type: '', text: '' }); }}
                  className="text-indigo-400 hover:underline font-semibold"
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}