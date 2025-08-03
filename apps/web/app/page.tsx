"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  Pen,
  Users,
  Zap,
  Download,
  Share2,
  Layers,
  MousePointer,
  Sparkles,
  ArrowRight,
  Github,
  Twitter,
  Play,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease-out",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse" />
      </div>

      <header className="relative z-10 px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Pen className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Scribbly
          </span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6 ">
          <Link
            href="/login"
            className="!text-slate-700 text-sm font-medium  hover:!text-blue-600 !cursor-pointer"
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className="!text-slate-700 text-sm font-medium hover:!text-blue-600 !cursor-pointer"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="px-4 py-20 md:py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Badge variant="secondary" className="mb-6 animate-pulse">
                <Sparkles className="w-3 h-3 mr-1" />
                Now in Beta
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
                Draw, Create,
                <br />
                <span className="relative">
                  Collaborate
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-4 text-blue-500 animate-pulse"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M5 6 Q150 1 295 6"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="animate-draw"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                The intuitive whiteboard that brings your ideas to life. Sketch,
                diagram, and brainstorm with the freedom of digital drawing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link href="/canvas">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Drawing
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 rounded-full hover:bg-slate-50 transition-all duration-300 bg-transparent text-black border-black-5"
                >
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </Button>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1500 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 h-96 relative overflow-hidden">
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg animate-pulse" />
                      <div className="w-8 h-8 bg-green-500 rounded-lg animate-pulse delay-100" />
                      <div className="w-8 h-8 bg-red-500 rounded-lg animate-pulse delay-200" />
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg animate-pulse delay-300" />
                    </div>

                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 800 400"
                    >
                      <circle
                        cx="200"
                        cy="150"
                        r="50"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        className="animate-draw-circle"
                      />
                      <rect
                        x="350"
                        y="100"
                        width="100"
                        height="100"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        className="animate-draw-rect"
                      />
                      <path
                        d="M500 150 L600 100 L650 200 Z"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        className="animate-draw-triangle"
                      />
                      <path
                        d="M100 250 Q200 200 300 250 T500 250"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="3"
                        className="animate-draw-curve"
                      />
                    </svg>

                    <div
                      className="absolute animate-float"
                      style={{ top: "60%", left: "70%" }}
                    >
                      <MousePointer className="w-6 h-6 text-slate-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-20 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Everything you need to create
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Powerful tools designed for seamless creativity and
                collaboration
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Palette,
                  title: "Rich Drawing Tools",
                  description:
                    "Pens, shapes, text, and more with customizable colors and styles",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Users,
                  title: "Real-time Collaboration",
                  description:
                    "Work together with your team in real-time, see changes instantly",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Layers,
                  title: "Infinite Canvas",
                  description:
                    "Never run out of space with our boundless drawing surface",
                  color: "from-purple-500 to-violet-500",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description:
                    "Optimized performance for smooth drawing experience",
                  color: "from-yellow-500 to-orange-500",
                },
                {
                  icon: Share2,
                  title: "Easy Sharing",
                  description:
                    "Share your creations with a simple link or export to various formats",
                  color: "from-pink-500 to-rose-500",
                },
                {
                  icon: Download,
                  title: "Export Anywhere",
                  description:
                    "Save as PNG, SVG, or PDF. Your work, your format",
                  color: "from-indigo-500 to-blue-500",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to start creating?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of creators, designers, and teams who trust
              Scribbly for their visual collaboration needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-3 rounded-full bg-white text-blue-600 hover:bg-slate-100 transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                Try Scribbly Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 rounded-full border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 bg-transparent"
              >
                <Twitter className="w-5 h-5 mr-2" />
                Follow Updates
              </Button>
            </div>
          </div>

          {/* Animated background shapes */}
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-spin" />
          <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white/20 rotate-45 animate-pulse" />
          <div className="absolute top-1/2 left-20 w-12 h-12 bg-white/10 rounded-full animate-bounce" />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Pen className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Scribbly</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-blue-400 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">
                Support
              </Link>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>
              &copy; 2024 Scribbly. All rights reserved. Made with ❤️ for
              creators.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes draw {
          from {
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
          }
          to {
            stroke-dasharray: 300;
            stroke-dashoffset: 0;
          }
        }

        @keyframes draw-circle {
          from {
            stroke-dasharray: 314;
            stroke-dashoffset: 314;
          }
          to {
            stroke-dasharray: 314;
            stroke-dashoffset: 0;
          }
        }

        @keyframes draw-rect {
          from {
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
          }
          to {
            stroke-dasharray: 400;
            stroke-dashoffset: 0;
          }
        }

        @keyframes draw-triangle {
          from {
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
          }
          to {
            stroke-dasharray: 300;
            stroke-dashoffset: 0;
          }
        }

        @keyframes draw-curve {
          from {
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
          }
          to {
            stroke-dasharray: 400;
            stroke-dashoffset: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-draw {
          animation: draw 3s ease-in-out infinite;
        }

        .animate-draw-circle {
          animation: draw-circle 2s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .animate-draw-rect {
          animation: draw-rect 2.5s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-draw-triangle {
          animation: draw-triangle 2s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .animate-draw-curve {
          animation: draw-curve 3s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
