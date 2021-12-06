export interface Info {
  name: string;
  node: string;
  port: number;
  net: string;
  protocol: string;
  api: string;
  os: string;
  os_v: string;
  client: string;
  canUpdateHistory: boolean;
  ip: string;
}

export interface Block {
  number: number;
  hash: string;
  parentHash: string;
  timestamp: number;
  miner: string;
  gasUsed: number;
  gasLimit: number;
  difficulty: string;
  totalDifficulty: string;
  transactions: any[];
  transactionsRoot: string;
  stateRoot: string;
  uncles: any[];
  trusted: boolean;
  arrived: number;
  received: number;
  propagation: number;
  fork: number;
  time: number;
}

export interface NodeStats {
  active: boolean;
  mining: boolean;
  hashrate: number;
  peers: number;
  pending: number;
  gasPrice: number;
  block: Block;
  syncing: boolean;
  propagationAvg: number;
  latency: string;
  uptime: number;
}

export interface Uptime {
  started: number;
  up: number;
  down: number;
  lastStatus: boolean;
  lastUpdate: number;
}

export interface AkromaNode {
  pinned: boolean;
  id: string;
  trusted: boolean;
  info: Info;
  geo?: any;
  stats: NodeStats;
  history: number[];
  uptime: Uptime;
  spark: string;
}
