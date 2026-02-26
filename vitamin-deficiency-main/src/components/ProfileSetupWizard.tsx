
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Activity, Utensils, Globe, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type Step = "bio" | "lifestyle" | "diet" | "region" | "final";

export const ProfileSetupWizard = ({ onComplete }: { onComplete: () => void }) => {
    const [step, setStep] = useState<Step>("bio");
    const [formData, setFormData] = useState({
        age: 28,
        gender: "",
        activity: 50,
        diet: "",
        region: "",
    });

    const nextStep = (s: Step) => setStep(s);

    const stepVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div className="max-w-xl mx-auto glass-layer-2 border-white/5 rounded-[2.5rem] p-10 space-y-8 relative overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] -z-10" />

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
                        <Sparkles className="text-white w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">Health Synthesis</h2>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Biometric Profiling</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    {["bio", "lifestyle", "diet", "region"].map((s, i) => (
                        <div key={s} className={`h-1 w-8 rounded-full transition-all ${step === s ? "bg-violet-500 w-12" : "bg-white/10"}`} />
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === "bio" && (
                    <motion.div key="bio" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold">Biometric Foundation</h3>
                            <p className="text-sm text-slate-500">Provide your basic parameters for baseline calibration.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Target Age</Label>
                                <Input
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                                    className="h-14 rounded-2xl bg-white/5 border-white/10 focus:border-violet-500 text-lg"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {["Male", "Female", "Non-binary", "Prefer not to say"].map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => setFormData({ ...formData, gender: g })}
                                        className={`h-14 rounded-2xl border transition-all text-sm font-bold ${formData.gender === g ? "bg-violet-500 border-violet-400 text-white" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"}`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Button className="w-full h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 font-bold" onClick={() => nextStep("lifestyle")}>
                            Synchronize & Continue
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                    </motion.div>
                )}

                {step === "lifestyle" && (
                    <motion.div key="lifestyle" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold">Activity Pulse</h3>
                            <p className="text-sm text-slate-500">How would you describe your metabolic demand?</p>
                        </div>
                        <div className="space-y-8 py-4">
                            <div className="flex justify-between text-xs font-bold text-slate-500 italic uppercase">
                                <span>Sedentary</span>
                                <span>Highly Active</span>
                            </div>
                            <Slider
                                defaultValue={[formData.activity]}
                                max={100}
                                step={1}
                                onValueChange={(val) => setFormData({ ...formData, activity: val[0] })}
                                className="z-10"
                            />
                            <div className="p-4 rounded-xl bg-violet-600/10 border border-violet-500/20 text-[10px] text-violet-400 font-bold uppercase tracking-widest text-center">
                                Metabolism Coefficient: {(formData.activity / 10).toFixed(1)}x
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" className="h-14 w-14 rounded-2xl border-white/10 bg-white/5" onClick={() => nextStep("bio")}>
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button className="flex-1 h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 font-bold" onClick={() => nextStep("diet")}>
                                Analyze Lifestyle
                            </Button>
                        </div>
                    </motion.div>
                )}

                {step === "diet" && (
                    <motion.div key="diet" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold">Dietary Architecture</h3>
                            <p className="text-sm text-slate-500">Select your primary nutritional framework.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {["Omnivore", "Vegan", "Vegetarian", "Paleo", "Keto", "Mediterranean"].map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setFormData({ ...formData, diet: d })}
                                    className={`flex flex-col gap-1 p-4 rounded-2xl border transition-all text-left ${formData.diet === d ? "bg-violet-600 border-violet-400 text-white" : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"}`}
                                >
                                    <Utensils className="w-4 h-4 mb-1" />
                                    <span className="font-bold text-sm">{d}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" className="h-14 w-14 rounded-2xl border-white/10 bg-white/5" onClick={() => nextStep("lifestyle")}>
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button className="flex-1 h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 font-bold" onClick={() => nextStep("region")}>
                                Mapping Micro-nutrients
                            </Button>
                        </div>
                    </motion.div>
                )}

                {step === "region" && (
                    <motion.div key="region" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold">Geographic Influence</h3>
                            <p className="text-sm text-slate-500">Sun exposure and climate affect vitamin synthesis.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Environment Profile</Label>
                                <select
                                    className="w-full h-14 rounded-2xl bg-white/5 border-white/10 border p-4 text-white focus:outline-none focus:border-violet-500"
                                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                >
                                    <option value="tropical">Tropical (High UV)</option>
                                    <option value="temperate">Temperate (Seasonal)</option>
                                    <option value="arctic">Arctic (Low UV)</option>
                                    <option value="desert">Desert (High UV/Low Humidity)</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" className="h-14 w-14 rounded-2xl border-white/10 bg-white/5" onClick={() => nextStep("diet")}>
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button className="flex-1 h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 font-bold border-0 shadow-xl shadow-violet-600/20" onClick={() => nextStep("final")}>
                                Finalize Health Profile
                            </Button>
                        </div>
                    </motion.div>
                )}

                {step === "final" && (
                    <motion.div key="final" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="text-center space-y-8 py-10">
                        <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-4 border-emerald-500/50 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="text-emerald-400 w-12 h-12" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-white">Profile Synchronized</h3>
                            <p className="text-slate-500">Your biological twin has been initialized. All AI insights will now be calibrated to your unique profile.</p>
                        </div>
                        <div className="flex items-center gap-4 justify-center py-4">
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Shield className="w-4 h-4 text-emerald-500" />
                                <span>Zero-Knowledge Secure</span>
                            </div>
                        </div>
                        <Button className="w-full h-16 rounded-3xl bg-white text-black hover:bg-slate-200 font-black text-lg tracking-tight" onClick={onComplete}>
                            Enter Health Ecosystem
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
