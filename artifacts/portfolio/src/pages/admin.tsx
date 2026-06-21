import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Lock,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  DollarSign,
  Video,
  Download,
} from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  whatsapp?: string;
  projectType: string;
  budget: string;
  message: string;
  createdAt: string;
}

const PROJECT_LABELS: Record<string, string> = {
  short: "Short Form (Reels/TikTok)",
  long: "Long Form (YouTube/Podcast)",
  motion: "Motion Graphics",
  thumbnail: "Thumbnail Design",
};

const BUDGET_LABELS: Record<string, string> = {
  "under-1000": "Under 1000",
  "1000-3000": "1000 – 3000",
  "3000-5000": "3000 – 5000",
  "5000+": "5000+",
};

export default function Admin() {
  const [secret, setSecret] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const {
    data: leads,
    isLoading,
    isError,
  } = useQuery<Lead[]>({
    queryKey: ["leads", submitted ? secret : null],
    enabled: submitted && secret.length > 0,
    queryFn: async () => {
      const res = await fetch("/api/leads", {
        headers: { "x-admin-secret": secret },
      });
      if (res.status === 401) throw new Error("Wrong password");
      if (!res.ok) throw new Error("Failed to fetch leads");
      return res.json();
    },
    retry: false,
  });

  function exportCsv() {
    if (!leads) return;
    const header = "ID,Name,Email,WhatsApp,Project Type,Budget,Message,Date\n";
    const rows = leads
      .map((l) =>
        [
          l.id,
          `"${l.name}"`,
          l.email,
          l.whatsapp ?? "",
          PROJECT_LABELS[l.projectType] ?? l.projectType,
          BUDGET_LABELS[l.budget] ?? l.budget,
          `"${l.message.replace(/"/g, '""')}"`,
          format(new Date(l.createdAt), "yyyy-MM-dd HH:mm"),
        ].join(","),
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-[#13131e] border border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Access</h1>
            <p className="text-sm text-gray-400">
              Enter your admin password to view leads
            </p>
          </div>
          <input
            type="password"
            placeholder="Password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && secret && setSubmitted(true)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            data-testid="input-admin-password"
          />
          <button
            onClick={() => secret && setSubmitted(true)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors"
            data-testid="button-admin-login"
          >
            View Leads
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Leads</h1>
            <p className="text-gray-400 mt-1">
              {isLoading
                ? "Loading..."
                : leads
                  ? `${leads.length} total submissions`
                  : ""}
            </p>
          </div>
          {leads && leads.length > 0 && (
            <button
              onClick={exportCsv}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl text-sm transition-colors"
              data-testid="button-export-csv"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          )}
        </div>

        {isLoading && (
          <div className="text-center py-20 text-gray-400">
            Loading leads...
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <p className="text-red-400 font-semibold">
              Wrong password. Try again.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setSecret("");
              }}
              className="mt-4 text-purple-400 hover:underline text-sm"
            >
              Go back
            </button>
          </div>
        )}

        {leads && leads.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No leads yet. Share your portfolio link!
          </div>
        )}

        {leads && leads.length > 0 && (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-[#13131e] border border-white/10 rounded-2xl p-6 space-y-4"
                data-testid={`card-lead-${lead.id}`}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {lead.name}
                    </h2>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="flex items-center gap-1.5 text-sm text-gray-300">
                        <Mail className="w-3.5 h-3.5 text-purple-400" />
                        <a
                          href={`mailto:${lead.email}`}
                          className="hover:text-purple-400 transition-colors"
                        >
                          {lead.email}
                        </a>
                      </span>
                      {lead.whatsapp && (
                        <span className="flex items-center gap-1.5 text-sm text-gray-300">
                          <Phone className="w-3.5 h-3.5 text-green-400" />
                          {lead.whatsapp}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(new Date(lead.createdAt), "MMM d, yyyy · h:mm a")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="flex items-center gap-1.5 bg-purple-600/15 text-purple-300 text-xs px-3 py-1.5 rounded-full">
                    <Video className="w-3 h-3" />
                    {PROJECT_LABELS[lead.projectType] ?? lead.projectType}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 text-gray-300 text-xs px-3 py-1.5 rounded-full">
                    <DollarSign className="w-3 h-3" />
                    {BUDGET_LABELS[lead.budget] ?? lead.budget}
                  </span>
                </div>

                <div className="flex gap-2 pt-1">
                  <MessageSquare className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {lead.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
