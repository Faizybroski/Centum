import { Button } from "@/components/ui/button";
import { Activity, FileCheck, Shield } from "lucide-react";

export default function WhyChooseSection() {
    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6">

                {/* LEFT CARD */}
                <div className="bg-white border rounded-xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Why Choose Our Testing?
                    </h2>

                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <div className="bg-[#0B3029]/10 rounded-full p-2">
                                <Shield className="h-4 w-4 text-[#0B3029]" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Certified Labs</p>
                                <p className="text-gray-600 text-sm">
                                    Accredited facilities meeting highest standards
                                </p>
                            </div>
                        </li>

                        <li className="flex items-center gap-3">
                            <div className="bg-[#0B3029]/10 rounded-full p-2">
                                <Activity className="h-4 w-4 text-[#0B3029]" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Fast Results</p>
                                <p className="text-gray-600 text-sm">
                                    Rapid turnaround without compromising accuracy
                                </p>
                            </div>
                        </li>

                        <li className="flex items-center gap-3">
                            <div className="bg-[#0B3029]/10 rounded-full p-2">
                                <FileCheck className="h-4 w-4 text-[#0B3029]" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Expert Analysis</p>
                                <p className="text-gray-600 text-sm">
                                    Board-certified professionals review all results
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* RIGHT CARD */}
                <div className="rounded-xl p-8 shadow-sm text-white bg-gradient-to-r from-[#16AF9D] to-[#0B3029]">
                    <h2 className="text-xl font-semibold mb-3">Need Help Choosing?</h2>
                    <p className="text-md text-white/80 mb-8">
                        Our specialists can provide insight to help choose the most suitable plan based on your health goals & medical history, not ‘right tests’
                    </p>

                    <Button className="w-full bg-white text-gray-900 font-medium py-2 rounded-xl hover:bg-gray-100 transition">
                        Contact Us
                    </Button>
                </div>
            </div>
        </section>
    );
}
