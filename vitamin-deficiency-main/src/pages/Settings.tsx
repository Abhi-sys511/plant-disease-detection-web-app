
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Bell, Shield, Eye, CreditCard, Monitor, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Settings = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
                    <p className="text-slate-500">Manage your ecosystem preferences and account security.</p>
                </div>
                <Button className="bg-violet-600 hover:bg-violet-700 h-11 px-6 gap-2 rounded-xl">
                    <Save className="w-4 h-4" />
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Nav */}
                <div className="space-y-2">
                    {[
                        { name: "General", icon: SettingsIcon, active: true },
                        { name: "Notifications", icon: Bell },
                        { name: "Privacy & Security", icon: Shield },
                        { name: "Personalization", icon: Eye },
                    ].map((item) => (
                        <button
                            key={item.name}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${item.active ? "bg-violet-600/10 text-violet-400 border border-violet-500/20" : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="glass-layer-1 border-white/5 overflow-hidden">
                        <CardHeader className="bg-white/5 border-b border-white/5 p-6">
                            <CardTitle className="text-lg">AI Performance Mode</CardTitle>
                            <CardDescription>Configure how the intelligence perception engine behaves.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Real-time Analysis</p>
                                    <p className="text-xs text-slate-500">Analyze biomarkers as you type.</p>
                                </div>
                                <div className="w-10 h-5 bg-violet-600 rounded-full relative">
                                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                            <div className="h-px bg-white/5 w-full" />
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Detailed Medical Reasoning</p>
                                    <p className="text-xs text-slate-500">Show depth analysis for every result.</p>
                                </div>
                                <div className="w-10 h-5 bg-slate-700 rounded-full relative">
                                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-layer-1 border-white/5 overflow-hidden">
                        <CardHeader className="bg-white/5 border-b border-white/5 p-6">
                            <CardTitle className="text-lg">Subscription Tier</CardTitle>
                            <CardDescription>Manage your premium health ecosystem membership.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 bg-violet-600/10 border border-violet-500/20 p-4 rounded-2xl">
                                <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center">
                                    <CreditCard className="text-white w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white">Platinum Member</p>
                                    <p className="text-xs text-violet-300">$29.00 / Month • Next billing Mar 26, 2026</p>
                                </div>
                                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl">Upgrade</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
};
