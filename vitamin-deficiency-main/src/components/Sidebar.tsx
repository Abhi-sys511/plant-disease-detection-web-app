
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    ClipboardCheck,
    MessageSquare,
    BarChart3,
    Settings,
    User,
    Pill,
    ChevronRight,
    LogOut,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/clerk-react";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Assessments", href: "/assessments", icon: ClipboardCheck },
    { name: "AI Nutritionist", href: "/nutritionist", icon: MessageSquare },
    { name: "Health Reports", href: "/reports", icon: BarChart3 },
];

const secondaryItems = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help & Support", href: "/support", icon: AlertCircle },
];

export const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 z-50 glass-layer-2 border-r border-white/5 flex flex-col pt-8 pb-6">
            {/* Logo */}
            <div className="px-8 mb-10">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
                        <Pill className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white group-hover:text-violet-400 transition-colors">Vitamin AI</span>
                </Link>
            </div>

            {/* Main Nav */}
            <nav className="flex-1 px-4 space-y-1">
                <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 mt-2">Main Menu</p>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link key={item.name} to={item.href}>
                            <motion.div
                                whileHover={{ x: 4 }}
                                className={cn(
                                    "px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium transition-all group relative",
                                    isActive
                                        ? "text-white bg-violet-600/10 border border-violet-500/20"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", isActive ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300")} />
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute left-0 w-1 h-6 bg-violet-500 rounded-r-full"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    )
                })}

                <div className="pt-8 mb-4">
                    <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Account</p>
                    {secondaryItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link key={item.name} to={item.href}>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    className={cn(
                                        "px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium transition-all group",
                                        isActive
                                            ? "text-white bg-violet-600/10 border border-violet-500/20"
                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <item.icon className={cn("w-5 h-5", isActive ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300")} />
                                    {item.name}
                                </motion.div>
                            </Link>
                        )
                    })}
                </div>
            </nav>

            {/* Bottom Profile */}
            <div className="px-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-4 py-3 glass-layer-1 rounded-2xl border-white/5 group h-16">
                    <UserButton afterSignOutUrl="/" />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">Member Pro</p>
                        <p className="text-[10px] text-slate-500 truncate">Premium Account</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                </div>
            </div>
        </aside>
    );
};
