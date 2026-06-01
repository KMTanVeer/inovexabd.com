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
  items: {
    name: string;
    path: string;
  }[];
  explorePath: string;
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
    id: 'cisco-nexus-93180yc-ex',
    name: 'Cisco Nexus N9K-C93180YC-EX',
    category: 'networking',
    price: 0,
    description: 'High-performance data center switching platform for modern enterprise infrastructure with ultra-low latency and scalable architecture.',
    image: img('Cisco Nexus N9K C93180YC EX', '1.jpg'),
    images: [
      img('Cisco Nexus N9K C93180YC EX', '1.jpg'),
      img('Cisco Nexus N9K C93180YC EX', '1.webp'),
      img('Cisco Nexus N9K C93180YC EX', '2.webp'),
      img('Cisco Nexus N9K C93180YC EX', '3.webp')
    ],
    rating: 4.9,
    specs: {
      Model: 'N9K-C93180YC-EX',
      Brand: 'Cisco Nexus',
      Type: 'Data Center Switch',
      Performance: 'Ultra-Low Latency'
    },
    isFeatured: true
  },
  {
    id: 'juniper-mx80',
    name: 'Juniper MX80 Universal Router',
    category: 'networking',
    price: 0,
    description: 'Reliable enterprise router built for scalable networks with strong routing performance and secure connectivity.',
    image: img('juniper mx80 universal router', '1.png'),
    images: [
      img('juniper mx80 universal router', '1.png'),
      img('juniper mx80 universal router', '2.webp'),
      img('juniper mx80 universal router', '3.webp'),
      img('juniper mx80 universal router', '4.webp'),
      img('juniper mx80 universal router', '5.webp'),
      img('juniper mx80 universal router', '6.webp'),
      img('juniper mx80 universal router', 'Juniper_MX80_Chassis_2X_P1-476x476.jpg.webp')
    ],
    rating: 4.8,
    specs: {
      Model: 'MX80',
      Brand: 'Juniper',
      Type: 'Universal Router',
      Use: 'Enterprise & ISP Routing'
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
    image: img('Supermicro 2.11  Lan Card', 'photo_1_2026-06-01_07-52-15.jpg'),
    images: [
      img('Supermicro 2.11  Lan Card', 'photo_1_2026-06-01_07-52-15.jpg'),
      img('Supermicro 2.11  Lan Card', 'photo_2_2026-06-01_07-52-15.jpg'),
      img('Supermicro 2.11  Lan Card', 'photo_3_2026-06-01_07-52-15.jpg'),
      img('Supermicro 2.11  Lan Card', 'photo_4_2026-06-01_07-52-15.jpg'),
      img('Supermicro 2.11  Lan Card', 'photo_5_2026-06-01_07-52-15.jpg'),
      img('Supermicro 2.11  Lan Card', 'photo_6_2026-06-01_07-52-15.jpg'),
      img('Supermicro 2.11  Lan Card', 'photo_7_2026-06-01_07-52-15.jpg'),
      img('Supermicro 2.11  Lan Card', 'photo_8_2026-06-01_07-52-15.jpg'),
      img('Supermicro 2.11  Lan Card', 'photo_9_2026-06-01_07-52-15.jpg'),
      img('Supermicro 2.11  Lan Card', 'photo_10_2026-06-01_07-52-15.jpg')
    ],
    rating: 4.7,
    specs: {
      Brand: 'Supermicro',
      Ports: '2 x SFP',
      Interface: 'PCIe',
      Version: '2.11'
    }
  },
  {
    id: 'intel-d7-p5520-7-68tb',
    name: 'Intel SSD D7-P5520 7.68TB NVMe SSD',
    category: 'storage',
    price: 0,
    description: 'High-capacity Intel enterprise NVMe SSD designed for mixed workload data center performance and endurance.',
    image: img('INTEL SSD D7-P5520 SERIES 2.5 7.68TB', 'photo_1_2026-06-01_07-53-10.jpg'),
    images: [
      img('INTEL SSD D7-P5520 SERIES 2.5 7.68TB', 'photo_1_2026-06-01_07-53-10.jpg'),
      img('INTEL SSD D7-P5520 SERIES 2.5 7.68TB', 'photo_2_2026-06-01_07-53-10.jpg'),
      img('INTEL SSD D7-P5520 SERIES 2.5 7.68TB', 'photo_3_2026-06-01_07-53-10.jpg')
    ],
    rating: 4.8,
    specs: {
      Series: 'Intel D7-P5520',
      Capacity: '7.68 TB',
      Interface: 'NVMe U.2',
      'Form Factor': '2.5-inch'
    }
  },
  {
    id: 'supermicro-10g-2port-v20',
    name: 'Supermicro 10G 2-Port SFP LAN Card v2.0',
    category: 'networking',
    price: 0,
    description: 'Dual-port 10GbE Supermicro LAN card with SFP connectivity for compact server networking deployments.',
    image: img('Supermicro 10G 2 Port SFP Lancard (Version 2.0)', 'photo_1_2026-06-01_07-53-55.jpg'),
    images: [
      img('Supermicro 10G 2 Port SFP Lancard (Version 2.0)', 'photo_1_2026-06-01_07-53-55.jpg'),
      img('Supermicro 10G 2 Port SFP Lancard (Version 2.0)', 'photo_2_2026-06-01_07-53-55.jpg')
    ],
    rating: 4.7,
    specs: {
      Brand: 'Supermicro',
      Speed: '10 Gbps',
      Ports: '2 x SFP+',
      Version: '2.0'
    }
  },
  {
    id: 'supermicro-10g-2port-v20-pro',
    name: 'Supermicro 10G-2 Port SFP LAN Card v2.0',
    category: 'networking',
    price: 0,
    description: 'Enterprise 10GbE PCIe LAN adapter from Supermicro with dual SFP ports for high-throughput server links.',
    image: img('Supermicro 10G-2 Port SFP Lancard ( Version 2.0)', 'photo_1_2026-06-01_07-55-10.jpg'),
    images: [
      img('Supermicro 10G-2 Port SFP Lancard ( Version 2.0)', 'photo_1_2026-06-01_07-55-10.jpg'),
      img('Supermicro 10G-2 Port SFP Lancard ( Version 2.0)', 'photo_2_2026-06-01_07-55-10.jpg'),
      img('Supermicro 10G-2 Port SFP Lancard ( Version 2.0)', 'photo_3_2026-06-01_07-55-10.jpg'),
      img('Supermicro 10G-2 Port SFP Lancard ( Version 2.0)', 'photo_4_2026-06-01_07-55-10.jpg'),
      img('Supermicro 10G-2 Port SFP Lancard ( Version 2.0)', 'photo_5_2026-06-01_07-55-10.jpg')
    ],
    rating: 4.8,
    specs: {
      Brand: 'Supermicro',
      Speed: '10 Gbps',
      Ports: '2 x SFP+',
      Interface: 'PCIe x8'
    }
  },
  {
    id: 'patch-cord-om4-100g',
    name: 'Patch Cord OM4 100G Fiber Cable',
    category: 'networking',
    price: 0,
    description: 'OM4 multi-mode 100G fiber patch cord for high-speed switch and server interconnects in data center racks.',
    image: img('Patch Cord  OM4 100G', 'photo_1_2026-06-01_07-55-35.jpg'),
    images: [img('Patch Cord  OM4 100G', 'photo_1_2026-06-01_07-55-35.jpg')],
    rating: 4.7,
    specs: {
      Type: 'Patch Cord',
      Grade: 'OM4',
      Speed: '100 Gbps',
      Connector: 'Fiber Optic'
    }
  },
  {
    id: 'samsung-pm863a-1-92tb',
    name: 'Samsung PM863a 1.92TB Enterprise SATA SSD',
    category: 'storage',
    price: 0,
    description: 'Enterprise-grade Samsung SATA SSD with strong endurance and reliable throughput for read-intensive applications.',
    image: img('Samsung PM863a 1.92TB Enterprise SATA 2.5 Solid State Drive (SSD)', 'photo_1_2026-06-01_07-55-58.jpg'),
    images: [img('Samsung PM863a 1.92TB Enterprise SATA 2.5 Solid State Drive (SSD)', 'photo_1_2026-06-01_07-55-58.jpg')],
    rating: 4.7,
    specs: {
      Series: 'Samsung PM863a',
      Capacity: '1.92 TB',
      Interface: 'SATA',
      'Form Factor': '2.5-inch'
    }
  },
  {
    id: 'dell-emc-intel-dc-p4510-1tb',
    name: 'Dell EMC Intel DC P4510 1TB NVMe SSD',
    category: 'storage',
    price: 0,
    description: 'Data center NVMe SSD from Dell EMC and Intel collaboration, tuned for low latency and scalable enterprise storage.',
    image: img('Dell EMC Intel DC P4510 Series 1.0TB NVMe U.2 2.5-inch enterprise solid-state drives', 'photo_1_2026-06-01_07-56-21.jpg'),
    images: [img('Dell EMC Intel DC P4510 Series 1.0TB NVMe U.2 2.5-inch enterprise solid-state drives', 'photo_1_2026-06-01_07-56-21.jpg')],
    rating: 4.8,
    specs: {
      Series: 'Intel DC P4510',
      Capacity: '1.0 TB',
      Interface: 'NVMe U.2',
      Brand: 'Dell EMC / Intel'
    }
  },
  {
    id: 'cisco-qsfp-40g-sr4',
    name: 'Cisco QSFP-40G-SR4 Transceiver',
    category: 'networking',
    price: 0,
    description: 'Cisco short-reach 40G transceiver module built for reliable high-bandwidth optical links in enterprise networks.',
    image: img('Cisco QSFP-40G-SR4', 'photo_1_2026-06-01_07-56-43.jpg'),
    images: [img('Cisco QSFP-40G-SR4', 'photo_1_2026-06-01_07-56-43.jpg')],
    rating: 4.8,
    specs: {
      Model: 'QSFP-40G-SR4',
      Type: 'Optical Transceiver',
      Speed: '40 Gbps',
      Interface: 'QSFP+'
    }
  },
  {
    id: 'mellanox-linkx-qsfp28-100g',
    name: 'Mellanox LinkX QSFP28 100Gbps Module',
    category: 'networking',
    price: 0,
    description: 'Mellanox LinkX 100GbE optical connectivity module for ultra-fast spine-leaf and HPC network fabrics.',
    image: img('Mellanox Link X QSFP28 100Gbs', 'photo_1_2026-06-01_07-57-05.jpg'),
    images: [img('Mellanox Link X QSFP28 100Gbs', 'photo_1_2026-06-01_07-57-05.jpg')],
    rating: 4.8,
    specs: {
      Brand: 'Mellanox',
      Type: 'QSFP28 Module',
      Speed: '100 Gbps',
      Interface: 'QSFP28'
    }
  },
  {
    id: 'mellanox-connectx5-25gbe-dual',
    name: 'Mellanox ConnectX-5 Dual-Port 25GbE SFP28 NIC',
    category: 'networking',
    price: 0,
    description: 'ConnectX-5 enterprise NIC with dual 25GbE SFP28 ports for virtualization, cloud, and high-performance computing.',
    image: img('Mellanox ConnectX-5 EN Dual-Port 25GbE SFP28 Network Interface Card (NIC)', 'photo_1_2026-06-01_07-57-37.jpg'),
    images: [
      img('Mellanox ConnectX-5 EN Dual-Port 25GbE SFP28 Network Interface Card (NIC)', 'photo_1_2026-06-01_07-57-37.jpg'),
      img('Mellanox ConnectX-5 EN Dual-Port 25GbE SFP28 Network Interface Card (NIC)', 'photo_2_2026-06-01_07-57-37.jpg')
    ],
    rating: 4.9,
    specs: {
      Series: 'ConnectX-5',
      Speed: '25 Gbps',
      Ports: '2 x SFP28',
      Interface: 'PCIe'
    }
  }
];

export const CATALOG_GROUPS: CatalogGroup[] = CATEGORIES.map((category) => ({
  name: category.name,
  items: PRODUCTS
    .filter((product) => product.category === category.id)
    .map((product) => ({
      name: product.name,
      path: `/product/${encodeURIComponent(product.id)}`
    })),
  explorePath: `/shop?category=${encodeURIComponent(category.id)}`
}));
