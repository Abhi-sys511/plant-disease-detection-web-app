
import { useLocation } from "react-router-dom";
import { Search, Bell, HelpCircle, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const TopBar = () => {
    const location = useLocation();

    // Simple breadcrumb logic
    const path = location.pathname.split('/').filter(Boolean);
    const pageName = path.length > 0 ? path[path.length - 1].charAt(0).toUpperCase() + path[path.length - 1].slice(1) : "Dashboard";

    return (
        <header className="h-20 border-b border-white/5 glass-layer-1 flex items-center justify-between px-8 sticky top-0 z-40">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Platform</span>
                <ChevronRight className="w-3 h-3 text-slate-700" />
                <span className="text-white font-medium">{pageName}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
                {/* Search Placeholder */}
                <div className="relative w-64 hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                        placeholder="Search biomarkers..."
                        className="h-10 pl-10 bg-white/5 border-white/5 focus:border-violet-500/50 rounded-xl text-sm transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                        <Bell className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                        <HelpCircle className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
};
