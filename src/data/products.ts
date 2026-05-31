import { LucideIcon, Network, HardDrive, Server } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  images?: string[];
  rating: number;
  specs: Record<string, string>;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  image: string;
  description: string;
}

export interface CatalogGroup {
  name: string;
  items: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'servers',
    name: 'Servers',
    icon: Server,
    image: 'https://images.unsplash.com/photo-1597852074351-7890b396781f?auto=format&fit=crop&q=80',
    description: 'Powerful server solutions for data centers and enterprise infrastructure.'
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: Network,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80',
    description: 'Enterprise networking solutions, ISP equipment, and high-speed connectivity.'
  },
  {
    id: 'storage',
    name: 'Storage',
    icon: HardDrive,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80',
    description: 'Enterprise SSDs, HDDs, data center RAM, processors, PSUs, and fiber accessories.'
  }
];

export const CATALOG_GROUPS: CatalogGroup[] = [
  {
    name: 'Servers',
    items: ['Dell R630', 'Dell R640', 'Dell R730', 'Supermicro Server']
  },
  {
    name: 'Networking',
    items: ['Intel NICs', 'Mellanox NICs', 'Huawei NICs', 'Cisco Switches', 'Juniper Routers', 'SFP/QSFP Modules']
  },
  {
    name: 'Storage',
    items: ['Enterprise SSDs', 'Enterprise HDDs', 'Data Center RAM', 'PSU', 'Processors', 'Fiber Patch Cords']
  }
];

const img = (folder: string, file: string) =>
  `/Products-image/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;

export const PRODUCTS: Product[] = [
  {
    id: 'dell-poweredge-r630',
    name: 'Dell PowerEdge R630 Rack Server',
    category: 'servers',
    price: 0,
    description: 'Enterprise 1U dual-socket rack server built for virtualization, database workloads, and dense compute deployments.',
    image: img('Dell PowerEdge R630', 'dell poweredge.jpg'),
    images: [
      img('Dell PowerEdge R630', 'dell poweredge.jpg'),
      img('Dell PowerEdge R630', '2.jpg'),
      img('Dell PowerEdge R630', '3.jpg')
    ],
    rating: 4.9,
    specs: {
      Model: 'PowerEdge R630',
      'Form Factor': '1U Rack',
      Processor: 'Intel Xeon E5 v3/v4 Platform',
      Storage: '2.5-inch SFF Drive Support'
    },
    isFeatured: true
  },
  {
    id: 'hgst-12tb-10k-sas-hdd',
    name: 'HGST 12TB 10K RPM Enterprise HDD',
    category: 'storage',
    price: 0,
    description: 'High-capacity enterprise hard drive designed for heavy read/write cycles in servers and storage arrays.',
    image: img('HGST 12 TB  10K RPM', 'photo_1_2026-05-31_10-45-21.jpg'),
    images: [
      img('HGST 12 TB  10K RPM', 'photo_1_2026-05-31_10-45-21.jpg'),
      img('HGST 12 TB  10K RPM', 'photo_2_2026-05-31_10-45-21.jpg')
    ],
    rating: 4.6,
    specs: {
      Capacity: '12 TB',
      Interface: 'SAS',
      Speed: '10,000 RPM',
      Usage: 'Enterprise Storage Systems'
    }
  },
  {
    id: 'hpe-7-68tb-nvme-ssd',
    name: 'HPE NVMe Enterprise SSD 7.68TB',
    category: 'storage',
    price: 0,
    description: 'High-end NVMe solid-state drive with low latency and high endurance for mission-critical data center applications.',
    image: img('HPE 768TB SSD NVMe', 'photo_1_2026-05-31_10-44-55.jpg'),
    images: [img('HPE 768TB SSD NVMe', 'photo_1_2026-05-31_10-44-55.jpg')],
    rating: 4.8,
    specs: {
      Brand: 'HPE',
      Capacity: '7.68 TB',
      Interface: 'NVMe PCIe',
      Type: 'Enterprise SSD'
    },
    isFeatured: true
  },
  {
    id: 'huawei-ce6870-24s6cq-ei',
    name: 'Huawei CloudEngine CE6870-24S6CQ-EI Switch',
    category: 'networking',
    price: 0,
    description: 'High-performance data center switch engineered for large east-west traffic, high port density, and low latency fabrics.',
    image: img('HUAWEI CE687024S6CQEI', 'photo_2026-05-31_10-42-51.jpg'),
    images: [
      img('HUAWEI CE687024S6CQEI', 'photo_2026-05-31_10-42-51.jpg'),
      img('HUAWEI CE687024S6CQEI', 'photo_1_2026-05-31_10-47-29.jpg'),
      img('HUAWEI CE687024S6CQEI', 'photo_2_2026-05-31_10-47-29.jpg'),
      img('HUAWEI CE687024S6CQEI', 'photo_3_2026-05-31_10-47-29.jpg'),
      img('HUAWEI CE687024S6CQEI', 'photo_4_2026-05-31_10-47-29.jpg'),
      img('HUAWEI CE687024S6CQEI', 'photo_5_2026-05-31_10-47-29.jpg'),
      img('HUAWEI CE687024S6CQEI', 'photo_6_2026-05-31_10-47-29.jpg'),
      img('HUAWEI CE687024S6CQEI', 'photo_7_2026-05-31_10-47-29.jpg'),
      img('HUAWEI CE687024S6CQEI', 'photo_8_2026-05-31_10-47-29.jpg'),
      img('HUAWEI CE687024S6CQEI', 'photo_9_2026-05-31_10-47-29.jpg'),
      img('HUAWEI CE687024S6CQEI', 'photo_10_2026-05-31_10-47-29.jpg')
    ],
    rating: 4.9,
    specs: {
      Model: 'CE6870-24S6CQ-EI',
      'Downlink Ports': '24 x 10/25GE SFP28',
      'Uplink Ports': '6 x 40/100GE QSFP28',
      Deployment: 'Data Center Spine/Leaf'
    },
    isFeatured: true
  },
  {
    id: 'intel-d3-s4510-480gb',
    name: 'Intel D3-S4510 480GB SATA SSD',
    category: 'storage',
    price: 0,
    description: 'Reliable 2.5-inch SATA enterprise SSD optimized for read-intensive workloads and consistent performance.',
    image: img('INTEL SSD D3  S4510 SERIES 2.5 6GAbs SATA SSD 480 GB', 'INTEL SSD D3  S4510 SERIES 2.5 6GAbs SATA SSD 480 GB.jpg'),
    images: [img('INTEL SSD D3  S4510 SERIES 2.5 6GAbs SATA SSD 480 GB', 'INTEL SSD D3  S4510 SERIES 2.5 6GAbs SATA SSD 480 GB.jpg')],
    rating: 4.7,
    specs: {
      Series: 'Intel D3-S4510',
      Capacity: '480 GB',
      Interface: 'SATA 6Gb/s',
      'Form Factor': '2.5-inch'
    }
  },
  {
    id: 'intel-dc-s3610-200gb',
    name: 'Intel DC S3610 200GB SATA SSD',
    category: 'storage',
    price: 0,
    description: 'Data center-grade SATA SSD delivering steady throughput, enhanced endurance, and dependable server performance.',
    image: img('INTEL SSD DC S3610 SERIES 2.5 6GAbs SATA SSD 200GB', 'INTEL SSD DC S3610 SERIES 2.5 6GAbs SATA SSD 200GB-1.jpg'),
    images: [
      img('INTEL SSD DC S3610 SERIES 2.5 6GAbs SATA SSD 200GB', 'INTEL SSD DC S3610 SERIES 2.5 6GAbs SATA SSD 200GB-1.jpg'),
      img('INTEL SSD DC S3610 SERIES 2.5 6GAbs SATA SSD 200GB', 'INTEL SSD DC S3610 SERIES 2.5 6GAbs SATA SSD 200GB-2.jpg'),
      img('INTEL SSD DC S3610 SERIES 2.5 6GAbs SATA SSD 200GB', 'INTEL SSD DC S3610 SERIES 2.5 6GAbs SATA SSD 200GB-3.jpg'),
      img('INTEL SSD DC S3610 SERIES 2.5 6GAbs SATA SSD 200GB', 'INTEL SSD DC S3610 SERIES 2.5 6GAbs SATA SSD 200GB-4.jpg'),
      img('INTEL SSD DC S3610 SERIES 2.5 6GAbs SATA SSD 200GB', 'INTEL SSD DC S3610 SERIES 2.5 6GAbs SATA SSD 200GB-5.jpg')
    ],
    rating: 4.7,
    specs: {
      Series: 'Intel DC S3610',
      Capacity: '200 GB',
      Interface: 'SATA 6Gb/s',
      Endurance: 'Enterprise Workload Optimized'
    }
  },
  {
    id: 'intel-dc-s4500-240gb',
    name: 'Intel DC S4500 240GB SATA SSD',
    category: 'storage',
    price: 0,
    description: 'Cost-efficient enterprise SSD with stable latency and strong reliability for cloud and virtualization platforms.',
    image: img('INTEL SSD DC S4500 SERIES 2.5 6GAbs SATA SSD 240GB', 'photo_1_2026-05-31_10-24-02.jpg'),
    images: [
      img('INTEL SSD DC S4500 SERIES 2.5 6GAbs SATA SSD 240GB', 'photo_1_2026-05-31_10-24-02.jpg'),
      img('INTEL SSD DC S4500 SERIES 2.5 6GAbs SATA SSD 240GB', 'photo_2_2026-05-31_10-24-02.jpg'),
      img('INTEL SSD DC S4500 SERIES 2.5 6GAbs SATA SSD 240GB', 'photo_3_2026-05-31_10-24-02.jpg'),
      img('INTEL SSD DC S4500 SERIES 2.5 6GAbs SATA SSD 240GB', 'photo_4_2026-05-31_10-24-02.jpg'),
      img('INTEL SSD DC S4500 SERIES 2.5 6GAbs SATA SSD 240GB', 'photo_5_2026-05-31_10-24-02.jpg'),
      img('INTEL SSD DC S4500 SERIES 2.5 6GAbs SATA SSD 240GB', 'photo_6_2026-05-31_10-24-02.jpg'),
      img('INTEL SSD DC S4500 SERIES 2.5 6GAbs SATA SSD 240GB', 'photo_7_2026-05-31_10-24-02.jpg'),
      img('INTEL SSD DC S4500 SERIES 2.5 6GAbs SATA SSD 240GB', 'photo_8_2026-05-31_10-24-02.jpg'),
      img('INTEL SSD DC S4500 SERIES 2.5 6GAbs SATA SSD 240GB', 'photo_9_2026-05-31_10-24-02.jpg'),
      img('INTEL SSD DC S4500 SERIES 2.5 6GAbs SATA SSD 240GB', 'photo_10_2026-05-31_10-24-02.jpg')
    ],
    rating: 4.8,
    specs: {
      Series: 'Intel DC S4500',
      Capacity: '240 GB',
      Interface: 'SATA 6Gb/s',
      'Form Factor': '2.5-inch'
    },
    isFeatured: true
  },
  {
    id: 'intel-d3-s4510-series-480gb',
    name: 'Intel D3-S4510 Series 480GB SSD',
    category: 'storage',
    price: 0,
    description: 'Enterprise SATA SSD variant from Intel D3-S4510 family for dependable everyday server storage performance.',
    image: img('Intel SSD D3-S4510 Sereis 480GB', 'Intel SSD D3-S4510 Sereis 480GB-thum.jpg'),
    images: [
      img('Intel SSD D3-S4510 Sereis 480GB', 'Intel SSD D3-S4510 Sereis 480GB-thum.jpg'),
      img('Intel SSD D3-S4510 Sereis 480GB', 'Intel SSD D3-S4510 Sereis 480GB-1.jpg'),
      img('Intel SSD D3-S4510 Sereis 480GB', 'Intel SSD D3-S4510 Sereis 480GB-2.jpg'),
      img('Intel SSD D3-S4510 Sereis 480GB', 'Intel SSD D3-S4510 Sereis 480GB-3.jpg')
    ],
    rating: 4.7,
    specs: {
      Series: 'Intel D3-S4510',
      Capacity: '480 GB',
      Interface: 'SATA 6Gb/s',
      'Form Factor': '2.5-inch'
    }
  },
  {
    id: 'mellanox-40g-dual-sfp',
    name: 'Mellanox 40G Dual-Port SFP Network Card',
    category: 'networking',
    price: 0,
    description: 'Dual-port 40GbE adapter for high-throughput server networking and low-latency data center communication.',
    image: img('Mellanox 40G 2 Port SFP LAN CARD', 'photo_1_2026-05-31_10-46-45.jpg'),
    images: [
      img('Mellanox 40G 2 Port SFP LAN CARD', 'photo_1_2026-05-31_10-46-45.jpg'),
      img('Mellanox 40G 2 Port SFP LAN CARD', 'photo_2_2026-05-31_10-46-45.jpg'),
      img('Mellanox 40G 2 Port SFP LAN CARD', 'photo_3_2026-05-31_10-46-45.jpg'),
      img('Mellanox 40G 2 Port SFP LAN CARD', 'photo_4_2026-05-31_10-46-45.jpg'),
      img('Mellanox 40G 2 Port SFP LAN CARD', 'photo_5_2026-05-31_10-46-45.jpg')
    ],
    rating: 4.8,
    specs: {
      Brand: 'Mellanox',
      Speed: '40 Gbps',
      Ports: '2 x SFP+',
      Interface: 'PCIe x8'
    },
    isFeatured: true
  },
  {
    id: 'intel-x710-da2-10g',
    name: 'Intel X710-DA2 10G Dual-Port SFP+ LAN Card',
    category: 'networking',
    price: 0,
    description: 'Enterprise-class dual-port 10GbE adapter based on Intel X710 controller with virtualization and offload support.',
    image: img('PCIE 3.0 X82 Port SFP10G Lan Card Model No  INTEL X710 DA2', 'photo_1_2026-05-31_10-25-03.jpg'),
    images: [
      img('PCIE 3.0 X82 Port SFP10G Lan Card Model No  INTEL X710 DA2', 'photo_1_2026-05-31_10-25-03.jpg'),
      img('PCIE 3.0 X82 Port SFP10G Lan Card Model No  INTEL X710 DA2', 'photo_2_2026-05-31_10-25-03.jpg'),
      img('PCIE 3.0 X82 Port SFP10G Lan Card Model No  INTEL X710 DA2', 'photo_3_2026-05-31_10-25-03.jpg'),
      img('PCIE 3.0 X82 Port SFP10G Lan Card Model No  INTEL X710 DA2', 'photo_4_2026-05-31_10-25-03.jpg'),
      img('PCIE 3.0 X82 Port SFP10G Lan Card Model No  INTEL X710 DA2', 'photo_5_2026-05-31_10-25-03.jpg'),
      img('PCIE 3.0 X82 Port SFP10G Lan Card Model No  INTEL X710 DA2', 'photo_6_2026-05-31_10-25-03.jpg'),
      img('PCIE 3.0 X82 Port SFP10G Lan Card Model No  INTEL X710 DA2', 'photo_7_2026-05-31_10-25-04.jpg'),
      img('PCIE 3.0 X82 Port SFP10G Lan Card Model No  INTEL X710 DA2', 'photo_8_2026-05-31_10-25-04.jpg')
    ],
    rating: 4.8,
    specs: {
      Controller: 'Intel X710',
      Speed: '10 Gbps',
      Ports: '2 x SFP+',
      Interface: 'PCIe 3.0 x8'
    },
    isFeatured: true
  },
  {
    id: 'intel-x520-da2-10g',
    name: 'Intel X520-DA2 10G Dual-Port SFP+ LAN Card',
    category: 'networking',
    price: 0,
    description: 'Proven dual-port 10GbE adapter with excellent compatibility for enterprise servers and virtualized environments.',
    image: img('PCIe x8FP 2 Port 10G SFP Lan Card Model No INTEL X520 DA2', 'photo_1_2026-05-31_10-26-27.jpg'),
    images: [
      img('PCIe x8FP 2 Port 10G SFP Lan Card Model No INTEL X520 DA2', 'photo_1_2026-05-31_10-26-27.jpg'),
      img('PCIe x8FP 2 Port 10G SFP Lan Card Model No INTEL X520 DA2', 'photo_2_2026-05-31_10-26-27.jpg'),
      img('PCIe x8FP 2 Port 10G SFP Lan Card Model No INTEL X520 DA2', 'photo_3_2026-05-31_10-26-27.jpg'),
      img('PCIe x8FP 2 Port 10G SFP Lan Card Model No INTEL X520 DA2', 'photo_4_2026-05-31_10-26-27.jpg'),
      img('PCIe x8FP 2 Port 10G SFP Lan Card Model No INTEL X520 DA2', 'photo_5_2026-05-31_10-26-27.jpg'),
      img('PCIe x8FP 2 Port 10G SFP Lan Card Model No INTEL X520 DA2', 'photo_6_2026-05-31_10-26-27.jpg'),
      img('PCIe x8FP 2 Port 10G SFP Lan Card Model No INTEL X520 DA2', 'photo_7_2026-05-31_10-26-27.jpg'),
      img('PCIe x8FP 2 Port 10G SFP Lan Card Model No INTEL X520 DA2', 'photo_8_2026-05-31_10-26-27.jpg'),
      img('PCIe x8FP 2 Port 10G SFP Lan Card Model No INTEL X520 DA2', 'photo_9_2026-05-31_10-26-27.jpg'),
      img('PCIe x8FP 2 Port 10G SFP Lan Card Model No INTEL X520 DA2', 'photo_10_2026-05-31_10-26-27.jpg')
    ],
    rating: 4.7,
    specs: {
      Controller: 'Intel X520',
      Speed: '10 Gbps',
      Ports: '2 x SFP+',
      Interface: 'PCIe x8'
    },
    isFeatured: true
  },
  {
    id: 'dell-1-8tb-10k-sas-hdd',
    name: 'Dell SAS 12Gbps 1.8TB 10K RPM Drive',
    category: 'storage',
    price: 0,
    description: 'Enterprise-grade SAS hard drive delivering balanced capacity and performance for transactional server workloads.',
    image: img('SAS 12 Gbps, 1.8 TB Dell, RPM 10K', 'SAS 12 Gbps, 1.8 TB Dell, RPM 10K-1.jpg'),
    images: [
      img('SAS 12 Gbps, 1.8 TB Dell, RPM 10K', 'SAS 12 Gbps, 1.8 TB Dell, RPM 10K-1.jpg'),
      img('SAS 12 Gbps, 1.8 TB Dell, RPM 10K', 'SAS 12 Gbps, 1.8 TB Dell, RPM 10K-2.jpg')
    ],
    rating: 4.6,
    specs: {
      Capacity: '1.8 TB',
      Interface: 'SAS 12Gbps',
      Speed: '10,000 RPM',
      Brand: 'Dell'
    }
  },
  {
    id: 'supermicro-dual-sfp-v211',
    name: 'Supermicro Dual-Port SFP LAN Card v2.11',
    category: 'networking',
    price: 0,
    description: 'Server network adapter from Supermicro with dual SFP connectivity, suitable for enterprise edge and core deployments.',
    image: img('Supermicro 2 port SFP Lan Card Version 211', 'photo_1_2026-05-31_10-41-32.jpg'),
    images: [
      img('Supermicro 2 port SFP Lan Card Version 211', 'photo_1_2026-05-31_10-41-32.jpg'),
      img('Supermicro 2 port SFP Lan Card Version 211', 'photo_2_2026-05-31_10-41-32.jpg'),
      img('Supermicro 2 port SFP Lan Card Version 211', 'photo_3_2026-05-31_10-41-32.jpg'),
      img('Supermicro 2 port SFP Lan Card Version 211', 'photo_4_2026-05-31_10-41-32.jpg'),
      img('Supermicro 2 port SFP Lan Card Version 211', 'photo_5_2026-05-31_10-41-32.jpg'),
      img('Supermicro 2 port SFP Lan Card Version 211', 'photo_6_2026-05-31_10-41-32.jpg'),
      img('Supermicro 2 port SFP Lan Card Version 211', 'photo_7_2026-05-31_10-41-32.jpg'),
      img('Supermicro 2 port SFP Lan Card Version 211', 'photo_8_2026-05-31_10-41-32.jpg'),
      img('Supermicro 2 port SFP Lan Card Version 211', 'photo_9_2026-05-31_10-41-32.jpg'),
      img('Supermicro 2 port SFP Lan Card Version 211', 'photo_10_2026-05-31_10-41-32.jpg')
    ],
    rating: 4.7,
    specs: {
      Brand: 'Supermicro',
      Ports: '2 x SFP',
      Interface: 'PCIe',
      Version: '2.11'
    }
  }
];
