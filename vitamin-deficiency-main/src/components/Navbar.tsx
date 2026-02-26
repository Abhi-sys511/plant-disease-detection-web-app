
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, LayoutDashboard, ClipboardCheck, MessageSquare, BarChart3, User, Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Assessments", href: "/assessments", icon: ClipboardCheck },
    { name: "AI Nutritionist", href: "/nutritionist", icon: MessageSquare },
    { name: "Reports", href: "/reports", icon: BarChart3 },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3" : "py-5"
                }`}
        >
            <div className="container mx-auto px-6">
                <div
                    className={`glass-morphism rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 ${isScrolled ? "bg-slate-900/60" : "bg-transparent border-transparent"
                        }`}
                >
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center shadow-lg shadow-purple-500/20"
                        >
                            <Pill className="text-white w-6 h-6" />
                        </motion.div>
                        <span className="text-xl font-bold tracking-tight text-white group-hover:text-violet-400 transition-colors">
                            Vitamin <span className="text-violet-500">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link key={item.name} to={item.href}>
                                <motion.div
                                    className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all ${location.pathname === item.href
                                        ? "text-white bg-white/10"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
                        >
                            <Sun className="w-5 h-5" />
                        </Button>
                        <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
                        <UserButton afterSignOutUrl="/" />

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-slate-400 hover:text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 p-6 md:hidden"
                    >
                        <div className="glass-morphism rounded-2xl p-4 flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 p-3 rounded-xl ${location.pathname === item.href
                                        ? "bg-violet-500/20 text-white"
                                        : "text-slate-400 hover:bg-white/5"
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
