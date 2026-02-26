
import { motion } from "framer-motion";
import { User, Mail, Shield, Award, Calendar, ChevronRight, Activity, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/clerk-react";
import { ProfileSetupWizard } from "@/components/ProfileSetupWizard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Profile = () => {
    const { user } = useUser();
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12 pb-20"
        >
            {/* Header / Banner */}
            <div className="relative h-56 rounded-[2.5rem] glass-layer-2 border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 blur-3xl" />
                <div className="absolute bottom-0 left-0 p-10 flex flex-col md:flex-row md:items-end justify-between w-full translate-y-4">
                    <div className="flex items-end gap-8 pb-10">
                        <div className="w-32 h-32 rounded-[2rem] bg-violet-600 border-4 border-navy-950 flex items-center justify-center overflow-hidden shadow-2xl relative group">
                            {user?.imageUrl ? (
                                <img src={user.imageUrl} alt="profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <User className="w-16 h-16 text-white" />
                            )}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="space-y-1 pb-4">
                            <h1 className="text-4xl font-black text-white tracking-tight">{user?.fullName || "Vitalized Member"}</h1>
                            <div className="flex items-center gap-3">
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/20 py-1 px-3">Sync Active</Badge>
                                <p className="text-violet-400 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Zap className="w-3 h-3" />
                                    Elite Bio-Tier
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pb-14">
                        <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
                            <DialogTrigger asChild>
                                <Button className="h-12 px-8 rounded-xl bg-white text-black hover:bg-slate-200 font-bold transition-all shadow-xl shadow-white/10">
                                    Calibrate Biometrics
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-xl p-0 bg-transparent border-0 shadow-none">
                                <ProfileSetupWizard onComplete={() => setIsWizardOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
                {/* Left: Info */}
                <div className="space-y-6">
                    <Card className="glass-layer-1 border-white/5 border-dashed">
                        <CardHeader>
                            <CardTitle className="text-lg">Personal Metrics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                <span className="text-xs text-slate-500">Member ID</span>
                                <span className="text-sm font-mono text-white/70">#VA-98443</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                <span className="text-xs text-slate-500">Join Date</span>
                                <span className="text-sm text-white/70">Feb 14, 2026</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                <span className="text-xs text-slate-500">Region</span>
                                <span className="text-sm text-white/70">Global Ecosystem</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-layer-1 border-white/5">
                        <CardHeader>
                            <CardTitle className="text-lg">Vaulted Achievements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { name: "Alpha", icon: Zap, color: "bg-amber-500/20 text-amber-500" },
                                    { name: "Iron", icon: Shield, color: "bg-blue-500/20 text-blue-500" },
                                    { name: "Zen", icon: Activity, color: "bg-emerald-500/20 text-emerald-500" },
                                    { name: "Vital", icon: Award, color: "bg-violet-500/20 text-violet-500" },
                                    { name: "Pulse", icon: TrendingUp, color: "bg-fuchsia-500/20 text-fuchsia-500" },
                                ].map((badge) => (
                                    <div key={badge.name} className="flex flex-col items-center gap-2 group cursor-help">
                                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110", badge.color)}>
                                            <badge.icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-500">{badge.name}</span>
                                    </div>
                                ))}
                                <div className="flex flex-col items-center gap-2 opacity-20 grayscale">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-tighter">Locked</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-layer-1 border-white/5">
                        <CardHeader>
                            <CardTitle className="text-lg">Privacy Shield</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 text-xs text-slate-400">
                                <Shield className="w-8 h-8 text-emerald-500" />
                                <span>Health data is end-to-end encrypted with zero-knowledge architecture.</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Journey */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 glass-layer-2 rounded-3xl space-y-2 border-white/5 border-l-4 border-l-violet-500 card-lift">
                            <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center mb-2">
                                <TrendingUp className="text-violet-400 w-5 h-5" />
                            </div>
                            <p className="text-sm text-slate-500">Assessment Accuracy</p>
                            <p className="text-3xl font-bold">94.2%</p>
                        </div>
                        <div className="p-6 glass-layer-2 rounded-3xl space-y-2 border-white/5 border-l-4 border-l-fuchsia-500 card-lift">
                            <div className="w-10 h-10 rounded-xl bg-fuchsia-600/10 flex items-center justify-center mb-2">
                                <Award className="text-fuchsia-400 w-5 h-5" />
                            </div>
                            <p className="text-sm text-slate-500">Health Milestones</p>
                            <p className="text-3xl font-bold">12 Active</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold px-2">Health Milestone Journey</h3>
                        <div className="space-y-3">
                            {[
                                { name: "Foundation Assessment", date: "Feb 14, 2026", status: "Completed", color: "text-emerald-400" },
                                { name: "Biomarker Optimization", date: "Feb 20, 2026", status: "Completed", color: "text-emerald-400" },
                                { name: "Peak Vitality Phase 1", date: "In Progress", status: "Active", color: "text-violet-400" },
                                { name: "Advanced Hormonal Balance", date: "Locked", status: "Requires 30 days", color: "text-slate-600" },
                            ].map((milestone) => (
                                <div key={milestone.name} className="flex items-center justify-between p-5 glass-layer-1 rounded-2xl border-white/5 hover:bg-white/5 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${milestone.color === 'text-emerald-400' ? 'bg-emerald-400' : 'bg-violet-400'} animate-pulse`} />
                                        <div>
                                            <p className="text-sm font-semibold">{milestone.name}</p>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{milestone.date}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${milestone.color}`}>{milestone.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
