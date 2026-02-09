import React from "react";
import Link from "next/link";
import Logo from "../Logo/Logo";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { TbCircleCheck, TbTrophy } from "react-icons/tb";

const Footer = () => {
  return (
    // Changed to a light gray background to create a clear section break from the main white body
    <footer className="bg-slate-50 border-t-4 border-primary/10 text-base-content mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div className="space-y-6">
              <Logo />
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                Hero Kidz is a premium e-commerce platform dedicated to
                high-quality toys. Built with a focus on seamless user
                experience and modern architecture.
              </p>
            </div>

            {/* Quick Contact for Everyone */}
            <div className="mt-8 flex gap-3">
              <a
                href="https://github.com/rafiul-neti"
                target="_blank"
                className="btn btn-sm btn-circle bg-white border-gray-200 hover:bg-black hover:text-white transition-all shadow-sm"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/irafiul210"
                target="_blank"
                className="btn btn-sm btn-circle bg-white border-gray-200 hover:bg-[#0077b5] hover:text-white transition-all shadow-sm"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h6 className="text-xs uppercase tracking-widest font-black text-gray-400 mb-8 flex items-center gap-2">
              <span className="w-8 h-px bg-gray-300"></span>
              Navigation
            </h6>
            <ul className="space-y-4 font-semibold text-gray-600">
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary transition-colors"
                >
                  Shop Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-primary transition-colors"
                >
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-primary transition-colors"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* RECRUITER ROOM - Highlighted Card */}
          <div className="md:col-span-5 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden group">
            {/* Decorative element to emphasize "New Section" feel */}
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <TbTrophy className="text-8xl rotate-12" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-md tracking-tighter uppercase">
                  Recruiter Room
                </span>
              </div>

              <h6 className="text-xl font-bold text-gray-900 mb-3">
                Interested in my work?
              </h6>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                This project showcases my ability to build complex features like{" "}
                <strong>Proxy-based Auth</strong> and{" "}
                <strong>Responsive UI</strong> {`using Next.js 16. Let's connect!`}
              </p>

              <div className="flex flex-wrap gap-2">
                <a
                  href="https://github.com/rafiul-neti/toy-hero-kidz"
                  target="_blank"
                  className="btn btn-sm h-11 bg-gray-900 text-white border-none px-4 normal-case hover:scale-105 transition-transform"
                >
                  <FaGithub className="text-lg" /> Source Code
                </a>
                <a
                  href="https://linkedin.com/in/irafiul210"
                  target="_blank"
                  className="btn btn-sm h-11 bg-[#0077b5] text-white border-none px-4 normal-case hover:scale-105 transition-transform"
                >
                  <FaLinkedinIn className="text-lg" /> LinkedIn
                </a>
                <a
                  href="mailto:your-email@example.com"
                  className="btn btn-sm h-11 btn-outline border-gray-200 px-4 normal-case hover:bg-primary hover:border-primary hover:text-white transition-all"
                >
                  <FaEnvelope /> Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-gray-400 font-medium">
          <p>
            © {new Date().getFullYear()} Hero Kidz. Crafted by{" "}
            <span className="text-gray-900 font-bold underline decoration-primary/30">
              Rafiul
            </span>
            .
          </p>
          <div className="flex items-center gap-4">
            {/* Swapped "Production Ready" for "Optimized UX" - shows you care about the user */}
            <span className="flex items-center gap-1.5">
              <TbCircleCheck className="text-success text-lg" /> Optimized UX
            </span>
            {/* Swapped "Highly Scalable" for "Clean Architecture" - shows you care about the code quality */}
            <span className="flex items-center gap-1.5">
              <TbCircleCheck className="text-success text-lg" /> Clean
              Architecture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
