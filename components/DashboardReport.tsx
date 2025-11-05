import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Campaign, DailyData, Meeting, Metrics, HeatmapCell } from '../types';

// --- DATA ---
const METRICS: Metrics = {
  sent: 25873,
  uniqueOpens: 1518,
  newLeads: 5560,
  opportunities: 42,
  uniqueReplies: 102,
  replyDenominator: 25873,
  meetingsCount: 7,
};

const CAMPAIGNS: Campaign[] = [
    { name: '26.10 Corporate wellness (apollo)', contacts: 1899, sent: 5132, done: 70.9, replies: 27 },
    { name: '26.10 General "Catch-All" Campaign (Apollo)', contacts: 1520, sent: 3601, done: 15.3, replies: 15 },
    { name: '26.10 Digital Health & Fitness Apps (apollo)', contacts: 1371, sent: 3322, done: 22.0, replies: 10 },
    { name: '18.10 Apolo campaign (top 10 industry - US)', contacts: 1122, sent: 2985, done: 49.3, replies: 6 },
    { name: '30.10 targeted leads Campaign', contacts: 928, sent: 2692, done: 96.0, replies: 12 },
    { name: '18.10 Get sales connected Campaign', contacts: 707, sent: 2029, done: 94.3, replies: 14 },
    { name: '26.10 Physical Therapy & Rehab (Apollo)', contacts: 411, sent: 1187, done: 96.4, replies: 12 },
    { name: '29.10 / Physical Therapy & Rehab (Apollo)', contacts: 393, sent: 1049, done: 71.0, replies: 6 },
    { name: '29.10 / D2C и B2B Wellness & Fitness Tech', contacts: 429, sent: 1029, done: 1.2, replies: 4 },
    { name: '26.10 Insurance Tech (apollo)', contacts: 333, sent: 954, done: 92.8, replies: 1 },
    { name: '29.10 / Insurance Tech / Member Retention & Data Intelligence', contacts: 329, sent: 929, done: 91.5, replies: 1 },
    { name: '10.10 new campaign Target leads / deep personalization', contacts: 101, sent: 374, done: 7.1, replies: 0 },
    { name: "Govher's Campaign for Partnerships", contacts: 110, sent: 210, done: 7.2, replies: 1 },
];

const DAILY_RAW: (string | number)[][] = [
    ['2025-09-18',30,0,0,0,0,0,0,0,0],['2025-09-19',100,0,0,2,1,0,0,0,0],['2025-09-20',100,0,0,0,0,0,0,0,0],['2025-09-21',100,0,0,0,0,0,0,0,0],['2025-09-22',125,0,0,3,3,0,0,0,0],['2025-09-23',125,0,0,0,0,0,0,0,0],['2025-09-24',125,0,0,2,2,0,0,0,0],['2025-09-25',125,0,0,0,0,0,0,0,0],['2025-09-26',125,0,0,0,0,0,0,0,0],['2025-09-29',150,0,0,0,0,0,0,0,0],['2025-09-30',535,0,0,5,4,0,0,0,0],['2025-10-01',535,0,0,5,2,0,0,0,0],['2025-10-02',535,0,0,3,3,0,0,0,0],['2025-10-03',535,0,0,1,1,0,0,0,0],['2025-10-06',635,0,0,5,5,0,0,0,0],['2025-10-07',605,373,284,5,5,0,0,0,0],['2025-10-08',615,385,317,1,1,0,0,0,0],['2025-10-09',615,362,279,3,3,0,0,0,0],['2025-10-10',615,367,301,0,0,0,0,0,0],['2025-10-11',0,39,34,2,1,0,0,0,0],['2025-10-12',0,19,16,0,0,0,0,0,0],['2025-10-13',710,429,330,0,0,0,0,0,0],['2025-10-14',710,39,33,6,6,0,0,0,0],['2025-10-15',715,17,16,1,1,0,0,0,0],['2025-10-16',715,17,14,3,3,0,0,0,0],['2025-10-17',715,5,4,3,3,0,0,0,0],['2025-10-18',0,5,3,0,0,0,0,0,0],['2025-10-19',0,4,4,0,0,0,0,0,0],['2025-10-20',810,8,8,4,4,0,0,0,0],['2025-10-21',810,8,8,7,6,0,0,0,0],['2025-10-22',810,9,8,5,4,0,0,0,0],['2025-10-23',811,5,4,2,2,0,0,0,0],['2025-10-24',811,14,8,4,4,0,0,0,0],['2025-10-25',800,4,2,2,2,0,0,0,0],['2025-10-26',0,4,2,2,2,0,0,0,0],['2025-10-27',910,5,3,9,7,0,0,0,0],
    ['2025-10-28', 849, 12, 7, 7, 7, 0, 0, 6, 6],
    ['2025-10-29', 1394, 4, 4, 2, 2, 0, 0, 1, 1],
    ['2025-10-30', 1234, 1, 1, 4, 4, 0, 0, 0, 0],
    ['2025-10-31', 1399, 5, 3, 3, 3, 0, 0, 1, 1],
    ['2025-11-01', 1239, 0, 0, 3, 3, 0, 0, 1, 1],
    ['2025-11-02', 0, 1, 1, 0, 0, 0, 0, 0, 0],
    ['2025-11-03', 1474, 0, 0, 14, 11, 0, 0, 4, 4],
    ['2025-11-04', 1327, 3, 3, 6, 6, 0, 0, 0, 0],
];

const MEETINGS: Meeting[] = [
    { name: 'Salman Rowjani', company: 'SmartBenefits', role: 'Business Head- Employee Benefits', link: 'http://www.linkedin.com/in/salman-rowjani-80608277', photoUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQEsVN1y7j43ig/profile-displayphoto-scale_400_400/B4DZlyY1KYGwAk-/0/1758560738715?e=1764201600&v=beta&t=rcsTaIj8SFsWKPTg41n75QLSFnkU4Efez5AnMZA26iM', status: 'Состоялась' },
    { name: 'Gautam Sharma', company: 'Toneop', role: 'Chief Technology Officer (CTO)', link: 'http://www.linkedin.com/in/gautamshar', photoUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQH7vHxksNceOg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1713545411877?e=1764201600&v=beta&t=Qjl2V7AzNawajBIQEg_J-NGg_YiuEB3AwKeCEoHLSTw', status: 'Состоялась' },
    { name: 'Jatin Doultani', company: 'Welleazy', role: 'Co Founder and Chief Executive Officer', link: 'http://www.linkedin.com/in/jatindoultani', photoUrl: '', status: 'Состоялась' },
    { name: 'Arindam Sarkar', company: 'Ctrlh', role: 'Co-Founder', link: 'http://www.linkedin.com/in/arindam-sarkar-092abb39', photoUrl: '', status: 'Состоялась' },
    { name: 'Sanjeev Magotra', company: 'Micro Steps', role: 'Founder & CEO', link: 'http://www.linkedin.com/in/sanjeev-magotra-6ba3ab', photoUrl: 'https://media.licdn.com/dms/image/v2/D5603AQEwoLC2vNQz7A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725759811281?e=1764201600&v=beta&t=ouY6jp6yxwgx7-8KCFA73VDcj4jUpYKjUYXLVEtDULo', status: 'Состоялась' },
    { name: 'Salam Ghoussaini', company: 'Wellfit', role: 'Head Of Information Technology', link: 'http://www.linkedin.com/in/salam-el-ghoussaini-8592a333', photoUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQGNoaXYS-swEw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1713982873568?e=1764201600&v=beta&t=-ob0lcgkjIdRK1wMgMCvQ8Uk-58MQ8UoDUita00huhA', status: 'Состоялась' },
    { name: 'Shai Granot', company: 'Effectivate', role: 'CEO & Co-Founder', link: 'http://www.linkedin.com/in/shaigranoteffectivate', photoUrl: 'https://media.licdn.com/dms/image/v2/C4D03AQF1kC6plp8S3g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1562615210079?e=1764201600&v=beta&t=qqHjJ3bx1yJ-EQeWdH44NakdQBAi4_LFjBP6t0XcSUM', status: 'Состоялась' },
];


// --- HELPER FUNCTIONS & COMPONENTS ---
const fmt = (n: number) => n.toLocaleString('ru-RU');

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/40 transition-all duration-200 ease-in-out hover:transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/60 ${className}`}>
    {children}
  </div>
);

const SummarySection: React.FC = () => (
  <section id="summary" className="section">
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4 text-slate-800">Ключевые результаты и выводы (месяц)</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div className="p-4 rounded-xl border bg-gradient-to-br from-sky-50 to-white">
          <div className="text-xs uppercase tracking-wide text-slate-500">Отправлено писем (месяц)</div>
          <div className="mt-1 flex items-end gap-2">
            <div className="text-3xl font-extrabold text-sky-700">{fmt(METRICS.sent)}</div>
            <span className="text-xs rounded-full py-0.5 px-2 text-slate-700 bg-slate-100 border border-slate-200">MTD</span>
          </div>
        </div>
        <div className="p-4 rounded-xl border bg-gradient-to-br from-amber-50 to-white">
          <div className="text-xs uppercase tracking-wide text-slate-500">Уникальные ответы (месяц)</div>
          <div className="mt-1 flex items-end gap-2">
            <div className="text-3xl font-extrabold text-amber-700">{fmt(METRICS.uniqueReplies)}</div>
            <span className="text-xs rounded-full py-0.5 px-2 text-slate-700 bg-slate-100 border border-slate-200">MTD</span>
          </div>
        </div>
        <div className="p-4 rounded-xl border bg-gradient-to-br from-emerald-50 to-white">
          <div className="text-xs uppercase tracking-wide text-slate-500">Конверсия в ответ (месяц)</div>
          <div className="mt-1 flex items-end gap-2">
            <div className="text-3xl font-extrabold text-emerald-700">{(METRICS.uniqueReplies / METRICS.replyDenominator * 100).toFixed(2)}%</div>
            <span className="text-xs rounded-full py-0.5 px-2 text-slate-700 bg-slate-100 border border-slate-200">{fmt(METRICS.uniqueReplies)} / {fmt(METRICS.replyDenominator)}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-700">
        Суммарные возможности за месяц: <span className="inline-flex items-center gap-1.5 font-bold rounded-md py-0.5 px-1.5" style={{background:'#E0E7FF',color:'#3730A3',borderColor:'#c7d2fe'}}>{METRICS.opportunities}</span>. 
        Новых контактов (лидов): <span className="inline-flex items-center gap-1.5 font-bold rounded-md py-0.5 px-1.5" style={{background:'#E0F2FE',color:'#075985',borderColor:'#bae6fd'}}>{fmt(METRICS.newLeads)}</span>. 
        Уникальных открытий: <span className="inline-flex items-center gap-1.5 font-bold rounded-md py-0.5 px-1.5" style={{background:'#FEF3C7',color:'#92400E',borderColor:'#fde68a'}}>{fmt(METRICS.uniqueOpens)}</span>.
      </p>
    </Card>
  </section>
);

const KpiSection: React.FC = () => {
  const kpiData = [
    { label: "Total sent", value: METRICS.sent, color: "bg-sky-500", textColor: "text-sky-700" },
    { label: "Unique opens", value: METRICS.uniqueOpens, color: "bg-amber-500", textColor: "text-amber-700" },
    { label: "New leads", value: METRICS.newLeads, color: "bg-cyan-400", textColor: "text-slate-900" },
    { label: "Opportunities", value: METRICS.opportunities, color: "bg-indigo-500", textColor: "text-indigo-700" },
    { label: "Unique replies", value: METRICS.uniqueReplies, color: "bg-emerald-500", textColor: "text-emerald-700" },
    { label: "Meetings", value: METRICS.meetingsCount, color: "bg-purple-500", textColor: "text-purple-700" },
  ];

  return (
    <section id="kpis" className="section">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiData.map(kpi => (
          <Card key={kpi.label} className="p-5">
            <div className="text-xs uppercase tracking-wide text-slate-500 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${kpi.color}`}></span>{kpi.label}
            </div>
            <div className={`mt-2 text-4xl font-extrabold ${kpi.textColor}`}>{fmt(kpi.value)}</div>
          </Card>
        ))}
      </div>
    </section>
  );
};

const CampaignsSection: React.FC = () => {
  const { sortedCampaigns, totals, maxReplies } = useMemo(() => {
    const sorted = [...CAMPAIGNS].sort((a, b) => b.replies - a.replies);
    const totalsData = sorted.reduce((acc, c) => ({
      contacts: acc.contacts + c.contacts,
      sent: acc.sent + c.sent,
      replies: acc.replies + c.replies,
    }), { contacts: 0, sent: 0, replies: 0 });
    const maxR = Math.max(1, ...sorted.map(d => d.replies));
    return { sortedCampaigns: sorted, totals: totalsData, maxReplies: maxR };
  }, []);

  const getReplyColorClasses = (replies: number) => {
    if (replies >= 15) return 'bg-emerald-100 text-emerald-800';
    if (replies >= 5) return 'bg-amber-100 text-amber-800';
    return 'bg-slate-100 text-slate-700';
  };
  
  return (
    <section id="campaigns" className="section">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-slate-800">Результаты по кампаниям (с 15 октября)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-sky-50 to-indigo-50">
              <tr className="text-left text-slate-700">
                <th className="p-3">Кампания</th>
                <th className="p-3">Контактировано лидов</th>
                <th className="p-3">Отправлено писем</th>
                <th className="p-3">% Завершенности кампании</th>
                <th className="p-3">Кол-во позитивных ответов</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedCampaigns.map(r => (
                <tr key={r.name}>
                  <td className="p-3 font-medium text-slate-800">{r.name}</td>
                  <td className="p-3">{fmt(r.contacts)}</td>
                  <td className="p-3">{fmt(r.sent)}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-3 min-w-[180px]">
                      <div className="bar w-40 h-2.5 rounded-full bg-slate-200">
                        <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" style={{ width: `${Math.max(0, Math.min(100, r.done))}%` }}></div>
                      </div>
                      <span className="text-slate-700 text-xs tabular-nums">{r.done.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className={`relative overflow-hidden rounded-md border border-slate-200 px-2 py-1 bg-white text-center min-w-[80px] ${getReplyColorClasses(r.replies)}`}>
                      <span className="absolute inset-0 bg-gradient-to-r from-green-200 to-green-400 opacity-75" style={{ width: `${r.replies / maxReplies * 100}%` }}></span>
                      <span className="relative z-10 font-bold">{r.replies}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-semibold text-slate-800">
              <tr>
                <td className="p-3">ИТОГО</td>
                <td className="p-3">{fmt(totals.contacts)}</td>
                <td className="p-3">{fmt(totals.sent)}</td>
                <td className="p-3">—</td>
                <td className="p-3">{fmt(totals.replies)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500">«Кол-во позитивных ответов» — градиентная визуализация: чем больше ответов относительно максимума, тем шире заливка. Пороговая окраска: ≥15 — зелёный, 5–14 — жёлтый, &lt;5 — серый.</p>
      </Card>
    </section>
  );
};

const DailyChartSection: React.FC<{
  data: DailyData[];
  startDate: string;
  endDate: string;
  minDate: string;
  maxDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}> = ({ data: chartData, startDate, endDate, minDate, maxDate, onStartDateChange, onEndDateChange }) => {
    const chartSeries = [
        { name: 'Отправлено', dataKey: 'sent', stroke: '#0ea5e9' },
        { name: 'Открыто', dataKey: 'opened', stroke: '#94a3b8' },
        { name: 'Уник. открытия', dataKey: 'uniqueOpens', stroke: '#facc15' },
        { name: 'Ответов', dataKey: 'replies', stroke: '#818cf8' },
        { name: 'Уник. ответы', dataKey: 'uniqueReplies', stroke: '#10b981' },
        { name: 'Клики', dataKey: 'clicks', stroke: '#f97316' },
        { name: 'Уник. клики', dataKey: 'uniqueClicks', stroke: '#ef4444' },
        { name: 'Возможности', dataKey: 'opportunities', stroke: '#8b5cf6' },
        { name: 'Уник. возможности', dataKey: 'uniqueOpportunities', stroke: '#ec4899' },
    ];

    return (
        <section id="graphDaily" className="section">
            <Card className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-4 px-2">
                  <h2 className="text-lg font-semibold">Динамика по дням</h2>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <label htmlFor="startDate" className="text-slate-600">От:</label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      min={minDate}
                      max={endDate}
                      onChange={(e) => onStartDateChange(e.target.value)}
                      className="border border-slate-300 rounded-md p-1.5 text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      aria-label="Start Date"
                    />
                    <label htmlFor="endDate" className="text-slate-600">До:</label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      min={startDate}
                      max={maxDate}
                      onChange={(e) => onEndDateChange(e.target.value)}
                      className="border border-slate-300 rounded-md p-1.5 text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      aria-label="End Date"
                    />
                  </div>
                </div>
                <div className="relative h-96 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#64748B" />
                            <YAxis tick={{ fontSize: 12 }} stroke="#64748B" />
                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                            <Legend wrapperStyle={{fontSize: "12px", paddingTop: "10px"}}/>
                            {chartSeries.map(s => <Line key={s.dataKey} type="monotone" dataKey={s.dataKey} name={s.name} stroke={s.stroke} strokeWidth={2} dot={false} />)}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </section>
    );
};

const HeatmapSection: React.FC<{ data: (string | number)[][] }> = ({ data: filteredDailyData }) => {
  const { heatmapData, maxVal } = useMemo(() => {
    if (!filteredDailyData || filteredDailyData.length === 0) {
      return { heatmapData: {}, maxVal: 1 };
    }
    const heat = filteredDailyData.map(d => ({ ds: d[0] as string, d: new Date(d[0] as string), val: d[5] as number }));
    const max = Math.max(1, ...heat.map(h => h.val));
    const weeks: { [key: string]: (HeatmapCell | null)[] } = {};
    const startMonday = (d: Date) => {
      const day = (d.getDay() + 6) % 7;
      const m = new Date(d);
      m.setDate(d.getDate() - day);
      m.setHours(0, 0, 0, 0);
      return m.toISOString().slice(0, 10);
    };

    heat.forEach(h => {
      const w = startMonday(h.d);
      if (!weeks[w]) weeks[w] = Array(7).fill(null);
      weeks[w][(h.d.getDay() + 6) % 7] = { date: h.ds, val: h.val };
    });

    return { heatmapData: weeks, maxVal: max };
  }, [filteredDailyData]);

  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const hasData = Object.keys(heatmapData).length > 0;

  return (
    <section id="heatmap" className="section">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-3">Тепловая карта активности по дням недели</h2>
        <p className="text-xs text-slate-600 mb-3">Интенсивность по <em>уникальным ответам</em> (чем ярче — тем больше). Подпись — дата (MM-DD).</p>
        {hasData ? (
          <div className="grid grid-cols-7 gap-0.5">
            {dayNames.map(name => <div key={name} className="text-[0.7rem] text-slate-500 text-center font-medium pb-1">{name}</div>)}
            {Object.keys(heatmapData).sort().flatMap(week =>
              heatmapData[week].map((cell, index) => {
                const intensity = cell ? cell.val / maxVal : 0;
                return (
                  <div key={`${week}-${index}`}
                       className="aspect-square rounded flex items-center justify-center text-[0.65rem] tabular-nums text-slate-800"
                       style={{ backgroundColor: `rgba(16, 185, 129, ${0.1 + intensity * 0.9})` }}
                       title={cell ? `${cell.date}: уник. ответы ${cell.val}` : '—'}>
                    {cell ? cell.date.slice(5) : ''}
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="text-center text-slate-500 py-8">Нет данных для выбранного периода.</div>
        )}
        <div className="mt-2 text-xs text-slate-500">Понедельник → Воскресенье.</div>
      </Card>
    </section>
  );
};

const MeetingsSection: React.FC = () => {
    const getStatusClasses = (status: string) => {
        if (status.includes('Состоялась')) return 'bg-emerald-100 text-emerald-800';
        return 'bg-slate-100 text-slate-800';
    };

    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };


    return (
        <section id="meetings" className="section">
            <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Встречи (состоялись с 15 октября)</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gradient-to-r from-sky-50 to-indigo-50">
                            <tr className="text-left text-slate-700">
                                <th className="p-3">Лид</th>
                                <th className="p-3">Должность / Компания</th>
                                <th className="p-3">Ссылка</th>
                                <th className="p-3">Статус</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MEETINGS.map((m, idx) => (
                                <tr key={`${m.name}-${idx}`}>
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            {m.photoUrl ? (
                                                <img src={m.photoUrl} alt={m.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100" />
                                            ) : (
                                                <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-sm ring-2 ring-slate-100">
                                                    {getInitials(m.name)}
                                                </div>
                                            )}
                                            <span className="font-medium text-slate-800">{m.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                      <div className="text-slate-700">{m.role}</div>
                                      <div className="text-xs text-slate-500">{m.company}</div>
                                    </td>
                                    <td className="p-3">
                                        {m.link && m.link !== '#' ? (
                                            <a target="_blank" rel="noopener noreferrer" href={m.link} className="text-sky-700 hover:text-sky-600 underline">
                                                LinkedIn
                                            </a>
                                        ) : null}
                                    </td>
                                    <td className="p-3">
                                        <span className={`rounded-full py-1 px-2.5 text-xs font-semibold ${getStatusClasses(m.status)}`}>
                                            {m.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </section>
    );
};

// --- MAIN COMPONENT ---
export const DashboardReport: React.FC = () => {
  const { minDate, maxDate } = useMemo(() => {
    const dates = DAILY_RAW.map(d => d[0] as string);
    return { minDate: dates[0], maxDate: dates[dates.length - 1] };
  }, []);

  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);

  const filteredDailyData = useMemo(() => {
    return DAILY_RAW.filter(d => {
      const date = d[0] as string;
      // Ensure start date is not after end date for filtering logic
      const effectiveStartDate = startDate > endDate ? endDate : startDate;
      return date >= effectiveStartDate && date <= endDate;
    });
  }, [startDate, endDate]);

  const chartData = useMemo(() => filteredDailyData.map(d => ({
        date: d[0] as string,
        sent: d[1] as number,
        opened: d[2] as number,
        uniqueOpens: d[3] as number,
        replies: d[4] as number,
        uniqueReplies: d[5] as number,
        clicks: d[6] as number,
        uniqueClicks: d[7] as number,
        opportunities: d[8] as number,
        uniqueOpportunities: d[9] as number,
    })), [filteredDailyData]);

  return (
    <>
      <SummarySection />
      <KpiSection />
      <CampaignsSection />
      <DailyChartSection
        data={chartData}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <HeatmapSection data={filteredDailyData} />
      <MeetingsSection />
    </>
  );
};
