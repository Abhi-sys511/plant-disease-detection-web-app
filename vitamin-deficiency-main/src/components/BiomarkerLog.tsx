
import { useState } from "react";
import { motion } from "framer-motion";
import { X, Check, Save, Beaker, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const BiomarkerLog = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            toast({
                title: "Biomarkers Synchronized",
                description: "Your clinical data has been integrated into the health cloud.",
            });
            setLoading(false);
            onClose();
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="w-full max-w-lg glass-layer-2 rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl"
            >
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center border border-violet-500/20">
                            <Beaker className="text-violet-400 w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">New Biomarker Log</h3>
                            <p className="text-xs text-slate-500">Sync blood test results with Vitamin AI</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest text-slate-500">Test Date</Label>
                            <Input type="date" className="bg-white/5 border-white/5 h-12 rounded-xl text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest text-slate-500">B12 Level (pg/mL)</Label>
                            <Input placeholder="e.g. 450" className="bg-white/5 border-white/5 h-12 rounded-xl text-white placeholder:text-slate-700" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest text-slate-500">Iron (μg/dL)</Label>
                            <Input placeholder="e.g. 85" className="bg-white/5 border-white/5 h-12 rounded-xl text-white placeholder:text-slate-700" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest text-slate-500">Vit D (ng/mL)</Label>
                            <Input placeholder="e.g. 32" className="bg-white/5 border-white/5 h-12 rounded-xl text-white placeholder:text-slate-700" />
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                        <p className="text-[10px] text-amber-500/80 leading-relaxed italic text-center">
                            Note: These logs are used to calibrate your AI nutritionist recommendations. Ensure values align with your clinical lab report.
                        </p>
                    </div>
                </div>

                <div className="p-8 border-t border-white/5 flex gap-4">
                    <Button variant="ghost" onClick={onClose} className="flex-1 h-14 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5">
                        Discard
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-lg shadow-violet-500/20"
                    >
                        {loading ? "Syncing..." : "Sync Biomarkers"}
                        {!loading && <Check className="ml-2 w-5 h-5" />}
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};
