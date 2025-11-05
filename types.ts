export interface Metrics {
  sent: number;
  uniqueOpens: number;
  newLeads: number;
  opportunities: number;
  uniqueReplies: number;
  replyDenominator: number;
  meetingsCount: number;
}

export interface Campaign {
  name: string;
  contacts: number;
  sent: number;
  done: number;
  replies: number;
}

export interface DailyData {
  date: string;
  sent: number;
  opened: number;
  uniqueOpens: number;
  replies: number;
  uniqueReplies: number;
  clicks: number;
  uniqueClicks: number;
  opportunities: number;
  uniqueOpportunities: number;
}

export interface Meeting {
  name: string;
  role: string;
  company: string;
  link: string;
  photoUrl: string;
  status: string;
}

export interface HeatmapCell {
  date: string;
  val: number;
}
