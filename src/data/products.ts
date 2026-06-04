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
    name: 'Dell PowerEdge R630 1U Rack Server',
    category: 'servers',
    price: 0,
    description: 'The Dell PowerEdge R630 is an ultra-dense, 1U two-socket rack server designed to deliver compromise-free virtualization, large database execution, and high-performance computing (HPC) power. With support for dual Intel Xeon E5-2600 v3/v4 processors and up to 1.5TB DDR4 RAM, it provides outstanding computational density for space-constrained data centers.',
    image: img('Dell PowerEdge R630', 'dell poweredge.jpg'),
    images: [
      img('Dell PowerEdge R630', 'dell poweredge.jpg'),
      img('Dell PowerEdge R630', '2.jpg'),
      img('Dell PowerEdge R630', '3.jpg')
    ],
    rating: 4.9,
    specs: {
      Model: 'PowerEdge R630',
      Brand: 'Dell Technologies',
      'Form Factor': '1U Rack Server',
      Processor: 'Dual Intel Xeon E5-2600 v3/v4 Series',
      Memory: '24 x DDR4 DIMM slots (Up to 1.5TB LRDIMM)',
      'Drive Bays': 'Up to 10 x 2.5" SFF Hot-Plug SAS/SATA/SSD',
      RAID: 'PERC H330, H730, H730P Controllers Supported',
      Power: 'Redundant Hot-Plug Power Supplies (495W / 750W / 1100W)',
      Manageability: 'iDRAC8 Enterprise with Lifecycle Controller'
    },
    isFeatured: true
  },
  {
    id: 'hgst-12tb-10k-sas-hdd',
    name: 'HGST Ultrastar C10K1800 1.2TB 10,000 RPM SAS 12Gb/s 2.5-inch Enterprise HDD',
    category: 'storage',
    price: 0,
    description: 'The HGST Ultrastar C10K1800 is a high-performance, mission-critical 2.5-inch enterprise hard drive offering 1.2TB of capacity. Engineered for write-intensive database applications, transactional processing, and multi-drive storage arrays, this SFF drive features a 12Gb/s SAS interface and operates at 10,000 RPM, delivering rapid access times and carrier-grade reliability.',
    image: img('HGST 12 TB  10K RPM', 'photo_1_2026-05-31_10-45-21.jpg'),
    images: [
      img('HGST 12 TB  10K RPM', 'photo_1_2026-05-31_10-45-21.jpg'),
      img('HGST 12 TB  10K RPM', 'photo_2_2026-05-31_10-45-21.jpg')
    ],
    rating: 4.8,
    specs: {
      Model: 'Ultrastar C10K1800 (HUC101812CSS200)',
      Brand: 'HGST (Western Digital)',
      Capacity: '1.2 TB',
      Interface: 'SAS 12Gb/s (Dual Port)',
      'Form Factor': '2.5-inch SFF (15mm)',
      Speed: '10,000 RPM',
      Cache: '128 MB',
      'Average Latency': '3.0 ms',
      Reliability: '2.0 Million Hours MTBF, RVS Technology'
    }
  },
  {
    id: 'hpe-7-68tb-nvme-ssd',
    name: 'HPE 7.68TB NVMe Gen4 High Read Intensive SFF BC Enterprise SSD',
    category: 'storage',
    price: 0,
    description: 'The HPE 7.68TB NVMe Gen4 High Read Intensive SSD is designed for platforms requiring massive data access speeds and high capacity, such as read-heavy cloud virtualization, data warehousing, and big data analysis. Utilizing the high-bandwidth PCIe Gen4 x4 interface, this 2.5-inch SFF Basic Carrier drive provides exceptional read IOPs, low response latency, and solid drive write endurance.',
    image: img('HPE 768TB SSD NVMe', 'photo_1_2026-05-31_10-44-55.jpg'),
    images: [img('HPE 768TB SSD NVMe', 'photo_1_2026-05-31_10-44-55.jpg')],
    rating: 4.8,
    specs: {
      Model: 'HPE P40509-B21',
      Brand: 'HPE (Hewlett Packard Enterprise)',
      Capacity: '7.68 TB',
      Interface: 'PCIe Gen4 x4 NVMe',
      'Form Factor': '2.5-inch SFF in Basic Carrier (BC)',
      'Workload Type': 'Read Intensive (1 DWPD)',
      'Sequential Reads': 'Up to 6,900 MB/s',
      'Sequential Writes': 'Up to 4,200 MB/s',
      Endurance: '7,000+ TBW (Terabytes Written)'
    },
    isFeatured: true
  },
  {
    id: 'huawei-ce6870-24s6cq-ei',
    name: 'Huawei CloudEngine CE6870-24S6CQ-EI 10G/100G Data Center Switch',
    category: 'networking',
    price: 0,
    description: 'The Huawei CloudEngine CE6870-24S6CQ-EI is an enterprise-grade data center L3 switch designed for massive east-west traffic networks. It features 24 x 10GE SFP+ ports alongside 6 x 100GE QSFP28 uplink ports. With a massive 4GB dynamic packet buffer, it prevents packet drops during bursty database, virtualization, and storage workloads, providing rock-solid spine-leaf performance.',
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
      Model: 'CloudEngine CE6870-24S6CQ-EI',
      Brand: 'Huawei Enterprise',
      'Port Configuration': '24 x 10GE SFP+ and 6 x 100GE QSFP28',
      'Switching Capacity': '1.68 Tbps',
      'Packet Forwarding Rate': '1,080 Mpps',
      'Packet Buffer': '4 GB Ultra-Large Buffer',
      Stacking: 'iStack Support (Up to 9 switches)',
      Features: 'VXLAN, EVPN, FCoE, Telemetry'
    },
    isFeatured: true
  },
  {
    id: 'cisco-nexus-93180yc-ex',
    name: 'Cisco Nexus 93180YC-EX 10G/25G/100G L3 Switch',
    category: 'networking',
    price: 0,
    description: 'The Cisco Nexus 93180YC-EX is a high-performance Layer 2/3 switch designed for top-of-rack (ToR) data center deployments. It is equipped with 48 x 10/25 Gbps SFP+ ports and 6 x 40/100 Gbps QSFP28 uplink ports, delivering 3.6 Tbps of switching capacity. It supports Cisco ACI (Application Centric Infrastructure) or standard NX-OS, enabling robust software-defined networking.',
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
      Brand: 'Cisco Systems',
      'Port Configuration': '48 x 10/25G SFP+ and 6 x 40/100G QSFP28',
      'Switching Capacity': '3.6 Tbps',
      'Forwarding Rate': '2.6 Bpps',
      Buffer: '40 MB Intelligent Buffer',
      Modes: 'Cisco ACI Mode or Standalone NX-OS Mode',
      Features: 'VXLAN, FCoE, IEEE 802.1Q tagging, OpenFlow'
    },
    isFeatured: true
  },
  {
    id: 'juniper-mx80',
    name: 'Juniper Networks MX80 Universal Routing Platform',
    category: 'networking',
    price: 0,
    description: 'The Juniper Networks MX80 is a compact, full-featured 2U routing platform engineered for enterprise, campus, and service provider edge deployments. It delivers 80 Gbps of system capacity and comes standard with 4 x 10GE SFP+ ports. With two Modular Interface Card (MIC) slots, the MX80 is highly customizable to support various fiber and copper interfaces under Junos OS.',
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
      Model: 'MX80-T-AC',
      Brand: 'Juniper Networks',
      'Form Factor': '2U Rackmount',
      Capacity: '80 Gbps Switching Capacity',
      'Fixed Ports': '4 x 10GE SFP+ Ports',
      'Expansion Slots': '2 x MIC (Modular Interface Card) Slots',
      OS: 'Junos OS',
      Services: 'L3 VPN, L2 VPN, VPLS, Carrier Grade NAT, MPLS'
    },
    isFeatured: true
  },
  {
    id: 'intel-d3-s4510-480gb',
    name: 'Intel SSD D3-S4510 Series 480GB 2.5-inch SATA III Enterprise SSD',
    category: 'storage',
    price: 0,
    description: 'The Intel D3-S4510 480GB SATA Enterprise SSD is optimized for read-intensive workloads, virtualization hosts, and data storage arrays. Built with 3D NAND TLC technology, this 2.5-inch, 7mm SSD offers consistent, predictable latency and high read-write operations, while substantially reducing power consumption compared to traditional air-filled hard drives.',
    image: img('INTEL SSD D3  S4510 SERIES 2.5 6GAbs SATA SSD 480 GB', 'INTEL SSD D3  S4510 SERIES 2.5 6GAbs SATA SSD 480 GB.jpg'),
    images: [img('INTEL SSD D3  S4510 SERIES 2.5 6GAbs SATA SSD 480 GB', 'INTEL SSD D3  S4510 SERIES 2.5 6GAbs SATA SSD 480 GB.jpg')],
    rating: 4.7,
    specs: {
      Model: 'SSDSC2KB480G801',
      Brand: 'Intel (Solidigm)',
      Capacity: '480 GB',
      Interface: 'SATA 6Gb/s (SATA III)',
      'Form Factor': '2.5-inch 7mm',
      NAND: 'Intel 3D NAND TLC',
      'Sequential Read': 'Up to 560 MB/s',
      'Sequential Write': 'Up to 490 MB/s',
      Endurance: '0.9 PBW (Petabytes Written) / 1.0 DWPD'
    }
  },
  {
    id: 'intel-dc-s3610-200gb',
    name: 'Intel SSD DC S3610 Series 200GB 2.5-inch SATA III Enterprise SSD',
    category: 'storage',
    price: 0,
    description: 'The Intel DC S3610 200GB is a high-endurance enterprise-class SATA III SSD designed for mixed-use workloads. Delivering high performance in both reads and writes, it is built with Intel 20nm HET (High Endurance Technology) MLC NAND. It is ideal for server swap files, virtualization, dynamic caching layers, and high-frequency transaction databases.',
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
      Model: 'SSDSC2BX200G4',
      Brand: 'Intel',
      Capacity: '200 GB',
      Interface: 'SATA 6Gb/s (SATA III)',
      'Form Factor': '2.5-inch 7mm',
      NAND: 'Intel 20nm HET MLC NAND',
      'Sequential Read': 'Up to 550 MB/s',
      'Sequential Write': 'Up to 230 MB/s',
      Endurance: '1.1 PBW / 3.0 DWPD (Drive Writes Per Day)'
    }
  },
  {
    id: 'intel-dc-s4500-240gb',
    name: 'Intel SSD DC S4500 Series 240GB 2.5-inch SATA III Enterprise SSD',
    category: 'storage',
    price: 0,
    description: 'The Intel DC S4500 240GB Enterprise SATA SSD is designed to help legacy storage arrays run more efficiently. Built on Intel 3D NAND TLC technology, it provides high read operations and reliable data integrity. It offers an excellent path to replace mechanical HDDs with high-performance, low-power solid-state infrastructure.',
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
      Model: 'SSDSC2KB240G7',
      Brand: 'Intel',
      Capacity: '240 GB',
      Interface: 'SATA 6Gb/s (SATA III)',
      'Form Factor': '2.5-inch 7mm',
      NAND: 'Intel 3D NAND TLC',
      'Sequential Read': 'Up to 500 MB/s',
      'Sequential Write': 'Up to 190 MB/s',
      Endurance: '0.47 PBW / 1.0 DWPD'
    },
    isFeatured: true
  },
  {
    id: 'intel-d3-s4510-series-480gb',
    name: 'Intel SSD D3-S4510 Series 480GB SATA Enterprise SSD (Alternative Carrier)',
    category: 'storage',
    price: 0,
    description: 'An alternative carrier variant of the Intel SSD D3-S4510 480GB. Utilizing Intel 3D NAND TLC, this drive provides the exact same high read IOPS and enterprise-grade power-loss data protection, making it compatible with various specialized server caddies and drive enclosures in modular data systems.',
    image: img('Intel SSD D3-S4510 Sereis 480GB', 'Intel SSD D3-S4510 Sereis 480GB-thum.jpg'),
    images: [
      img('Intel SSD D3-S4510 Sereis 480GB', 'Intel SSD D3-S4510 Sereis 480GB-thum.jpg'),
      img('Intel SSD D3-S4510 Sereis 480GB', 'Intel SSD D3-S4510 Sereis 480GB-1.jpg'),
      img('Intel SSD D3-S4510 Sereis 480GB', 'Intel SSD D3-S4510 Sereis 480GB-2.jpg'),
      img('Intel SSD D3-S4510 Sereis 480GB', 'Intel SSD D3-S4510 Sereis 480GB-3.jpg')
    ],
    rating: 4.7,
    specs: {
      Model: 'SSDSC2KB480G8R',
      Brand: 'Intel (Solidigm)',
      Capacity: '480 GB',
      Interface: 'SATA 6Gb/s (SATA III)',
      'Form Factor': '2.5-inch 7mm',
      NAND: 'Intel 3D NAND TLC',
      'Sequential Read': 'Up to 560 MB/s',
      'Sequential Write': 'Up to 490 MB/s',
      Endurance: '0.9 PBW / 1.0 DWPD'
    }
  },
  {
    id: 'mellanox-40g-dual-sfp',
    name: 'Mellanox ConnectX-3 EN MCX312B-XCCT Dual-Port 10G/40G SFP+ Network Adapter',
    category: 'networking',
    price: 0,
    description: 'The Mellanox ConnectX-3 EN (MCX312B-XCCT) is a dual-port 10G/40G SFP+ network interface card designed for latency-sensitive network storage and cloud servers. Equipped with a PCIe 3.0 x8 interface, it features RoCE (RDMA over Converged Ethernet) and network virtualization offloads (VXLAN, NVGRE), maximizing server performance.',
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
      Model: 'MCX312B-XCCT',
      Brand: 'Mellanox (NVIDIA)',
      Speed: '10G/40G Ethernet',
      Ports: '2 x SFP+ / SFP28 compatible slots',
      Interface: 'PCIe 3.0 x8',
      Offloads: 'VXLAN, NVGRE, RoCE v1/v2, SR-IOV',
      Bracket: 'Full Height and Low Profile options included'
    },
    isFeatured: true
  },
  {
    id: 'intel-x710-da2-10g',
    name: 'Intel Ethernet Converged Network Adapter X710-DA2 Dual-Port SFP+ 10GbE',
    category: 'networking',
    price: 0,
    description: 'The Intel Ethernet Converged Network Adapter X710-DA2 is a dual-port 10GbE network interface card designed for server virtualization, cloud setups, and LAN workloads. It features hardware-based traffic optimization (Intel Flow Director) and full support for network virtualization offloads (VXLAN, NVGRE, Geneve) on a PCIe 3.0 x8 interface.',
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
      Model: 'X710DA2',
      Brand: 'Intel',
      Speed: '10 Gbps per port',
      Ports: '2 x SFP+ Ports',
      Interface: 'PCIe 3.0 x8',
      Controller: 'Intel Ethernet Controller X710-AM2',
      Features: 'Intel Flow Director, VXLAN, NVGRE, SR-IOV (Up to 128 VFs)'
    },
    isFeatured: true
  },
  {
    id: 'intel-x520-da2-10g',
    name: 'Intel Ethernet Server Adapter X520-DA2 Dual-Port SFP+ 10GbE',
    category: 'networking',
    price: 0,
    description: 'The Intel Ethernet Server Adapter X520-DA2 is a highly reliable, dual-port 10GbE SFP+ adapter card designed for storage area networks (SAN) and high-traffic databases. Powered by the Intel 82599ES controller, it offers native FCoE and iSCSI hardware offloads, reducing CPU utilization while maintaining packet performance.',
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
      Model: 'E10G42BTDA',
      Brand: 'Intel',
      Speed: '10 Gbps per port',
      Ports: '2 x SFP+ Ports',
      Interface: 'PCIe 2.0 x8',
      Controller: 'Intel 82599ES 10GbE Controller',
      Features: 'iSCSI, FCoE, SR-IOV, VMDq support'
    },
    isFeatured: true
  },
  {
    id: 'dell-1-8tb-10k-sas-hdd',
    name: 'Dell 1.8TB 10K RPM SAS 12Gbps 512e 2.5-inch SFF Enterprise Hot-Plug HDD',
    category: 'storage',
    price: 0,
    description: 'The Dell 1.8TB 10K RPM SAS 12Gbps is a small form factor (SFF) 2.5-inch enterprise mechanical hard drive designed for Dell PowerEdge servers. Operating at 10,000 RPM over a fast SAS 12Gbps interface, this 512e sector format drive delivers the optimal combination of transaction performance, capacity, and power efficiency for high-density storage applications.',
    image: img('SAS 12 Gbps, 1.8 TB Dell, RPM 10K', 'SAS 12 Gbps, 1.8 TB Dell, RPM 10K-1.jpg'),
    images: [
      img('SAS 12 Gbps, 1.8 TB Dell, RPM 10K', 'SAS 12 Gbps, 1.8 TB Dell, RPM 10K-1.jpg'),
      img('SAS 12 Gbps, 1.8 TB Dell, RPM 10K', 'SAS 12 Gbps, 1.8 TB Dell, RPM 10K-2.jpg')
    ],
    rating: 4.6,
    specs: {
      Model: 'AL14SEB18EQ',
      Brand: 'Dell (Toshiba)',
      Capacity: '1.8 TB',
      Interface: 'SAS 12Gbps (Dual Port)',
      'Form Factor': '2.5-inch SFF in Hot-Plug Caddy',
      Speed: '10,000 RPM',
      Cache: '128 MB',
      'Sector Format': '512e (512-byte Emulation)'
    }
  },
  {
    id: 'supermicro-dual-sfp-v211',
    name: 'Supermicro AOC-STGN-i2S Dual-Port 10GbE SFP+ PCI-e Controller Card (v2.11)',
    category: 'networking',
    price: 0,
    description: 'The Supermicro AOC-STGN-i2S (v2.11) is a low-power, dual-port 10GbE network interface card based on the Intel 82599ES controller. Designed for Supermicro SuperServers and storage platforms, this PCIe card supports high-throughput SFP+ optical links, Direct Attach Copper (DAC) cables, and features robust virtualization offloads.',
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
      Model: 'AOC-STGN-i2S (v2.11)',
      Brand: 'Supermicro',
      Speed: '10 Gbps per port',
      Ports: '2 x SFP+ Ports',
      Interface: 'PCIe 2.0 x8',
      Controller: 'Intel 82599ES Controller',
      Features: 'VMDq, SR-IOV, FCoE, Direct Attach Copper Support'
    }
  },
  {
    id: 'intel-d7-p5520-7-68tb',
    name: 'Solidigm D7-P5520 Series 7.68TB NVMe PCIe 4.0 x4 U.2 2.5-inch Enterprise SSD',
    category: 'storage',
    price: 0,
    description: 'The Solidigm D7-P5520 (formerly Intel SSD D7-P5520) is a 7.68TB enterprise-grade PCIe 4.0 NVMe SSD. Utilizing advanced 144-Layer 3D TLC NAND, this high-performance U.2 drive delivers massive read speeds up to 7,100 MB/s and extreme endurance (1 DWPD), optimized for write-intensive cloud virtualization, HPC, and heavy databases.',
    image: img('INTEL SSD D7-P5520 SERIES 2.5 7.68TB', 'photo_1_2026-06-01_07-53-10.jpg'),
    images: [
      img('INTEL SSD D7-P5520 SERIES 2.5 7.68TB', 'photo_1_2026-06-01_07-53-10.jpg'),
      img('INTEL SSD D7-P5520 SERIES 2.5 7.68TB', 'photo_2_2026-06-01_07-53-10.jpg'),
      img('INTEL SSD D7-P5520 SERIES 2.5 7.68TB', 'photo_3_2026-06-01_07-53-10.jpg')
    ],
    rating: 4.8,
    specs: {
      Model: 'SSDPF2KX076TZ01',
      Brand: 'Solidigm (Intel)',
      Capacity: '7.68 TB',
      Interface: 'PCIe 4.0 x4 NVMe',
      'Form Factor': 'U.2 2.5-inch 15mm',
      NAND: '144-Layer 3D TLC NAND',
      'Sequential Read': 'Up to 7,100 MB/s',
      'Sequential Write': 'Up to 4,200 MB/s',
      Endurance: '14.0 PBW / 1.0 DWPD'
    }
  },
  {
    id: 'supermicro-10g-2port-v20',
    name: 'Supermicro AOC-STGN-i2S Dual-Port 10GbE SFP+ PCI-e Controller Card (v2.0)',
    category: 'networking',
    price: 0,
    description: 'The AOC-STGN-i2S (v2.0) is a dual-port 10G SFP+ PCI-e network card manufactured by Supermicro. Built on the industry-standard Intel 82599ES controller, it allows high-speed 10Gbps optical fiber and DAC copper connections, providing solid load balancing and virtualization support for rackmount servers.',
    image: img('Supermicro 10G 2 Port SFP Lancard (Version 2.0)', 'photo_1_2026-06-01_07-53-55.jpg'),
    images: [
      img('Supermicro 10G 2 Port SFP Lancard (Version 2.0)', 'photo_1_2026-06-01_07-53-55.jpg'),
      img('Supermicro 10G 2 Port SFP Lancard (Version 2.0)', 'photo_2_2026-06-01_07-53-55.jpg')
    ],
    rating: 4.7,
    specs: {
      Model: 'AOC-STGN-i2S (v2.0)',
      Brand: 'Supermicro',
      Speed: '10 Gbps per port',
      Ports: '2 x SFP+ Slots',
      Interface: 'PCIe 2.0 x8',
      Controller: 'Intel 82599ES Controller',
      Features: 'VMDq, SR-IOV, FCoE, Direct Attach Copper Support'
    }
  },
  {
    id: 'supermicro-10g-2port-v20-pro',
    name: 'Supermicro AOC-STGN-i2S Dual-Port 10GbE SFP+ PCI-e Controller Card (Pro Carrier)',
    category: 'networking',
    price: 0,
    description: 'A variant of Supermicro AOC-STGN-i2S dual-port 10GbE network controller equipped with a custom pro-series carrier bracket. Based on the Intel 82599ES chip, it is optimized for high-bandwidth virtualization, high-speed storage networking, and redundant link deployments in modern IT setups.',
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
      Model: 'AOC-STGN-i2S (Pro-bracket)',
      Brand: 'Supermicro',
      Speed: '10 Gbps per port',
      Ports: '2 x SFP+ Slots',
      Interface: 'PCIe 2.0 x8',
      Controller: 'Intel 82599ES Controller',
      Features: 'VMDq, SR-IOV, FCoE, Direct Attach Copper Support'
    }
  },
  {
    id: 'patch-cord-om4-100g',
    name: 'LC-LC OM4 Multimode Duplex 100G Fiber Patch Cord',
    category: 'networking',
    price: 0,
    description: 'This LC to LC OM4 Laser-Optimized Multimode Fiber (LOMMF) patch cord is designed for 40G/100G high-speed networking applications. Constructed with 50/125µm fiber core and a Low Smoke Zero Halogen (LSZH) jacket, it provides low insertion loss and high bandwidth capabilities in short-range data center switch links.',
    image: img('Patch Cord  OM4 100G', 'photo_1_2026-06-01_07-55-35.jpg'),
    images: [img('Patch Cord  OM4 100G', 'photo_1_2026-06-01_07-55-35.jpg')],
    rating: 4.7,
    specs: {
      Type: 'OM4 Duplex Multimode Fiber Patch Cord',
      Connector: 'LC to LC Duplex',
      'Fiber Core': '50/125 micron (Laser-Optimized)',
      Jacket: 'LSZH (Low Smoke Zero Halogen)',
      Speed: 'Up to 100 Gbps (OM4 standard)',
      Color: 'Aqua / Violet (standard OM4)',
      Wavelengths: '850 nm / 1300 nm'
    }
  },
  {
    id: 'samsung-pm863a-1-92tb',
    name: 'Samsung PM863a Series 1.92TB SATA III 2.5-inch Enterprise SSD',
    category: 'storage',
    price: 0,
    description: 'The Samsung PM863a 1.92TB is an enterprise-class SATA III 2.5-inch SSD designed for data centers requiring high read-write stability. Utilizing Samsung V-NAND technology, this SSD features power-loss protection, high queue-depth performance, and is optimized for web servers, content distribution networks, and enterprise database infrastructure.',
    image: img('Samsung PM863a 1.92TB Enterprise SATA 2.5 Solid State Drive (SSD)', 'photo_1_2026-06-01_07-55-58.jpg'),
    images: [img('Samsung PM863a 1.92TB Enterprise SATA 2.5 Solid State Drive (SSD)', 'photo_1_2026-06-01_07-55-58.jpg')],
    rating: 4.7,
    specs: {
      Model: 'MZ7LM1T9HMJP',
      Brand: 'Samsung Electronics',
      Capacity: '1.92 TB',
      Interface: 'SATA 6Gb/s (SATA III)',
      'Form Factor': '2.5-inch 7mm',
      NAND: 'Samsung V-NAND TLC',
      'Sequential Read': 'Up to 520 MB/s',
      'Sequential Write': 'Up to 480 MB/s',
      Endurance: '2,633 TBW / 1.3 DWPD'
    }
  },
  {
    id: 'dell-emc-intel-dc-p4510-1tb',
    name: 'Dell Intel SSD DC P4510 Series 1.0TB NVMe PCIe 3.1 x4 U.2 2.5-inch Enterprise SSD',
    category: 'storage',
    price: 0,
    description: 'The Dell Intel DC P4510 1.0TB NVMe SSD is a high-performance U.2 drive engineered for cloud systems, hyperconverged architectures, and database operations. Built with Intel 3D NAND TLC technology on a PCIe 3.1 x4 interface, it minimizes latency, increases throughput, and is fully certified for Dell PowerEdge servers.',
    image: img('Dell EMC Intel DC P4510 Series 1.0TB NVMe U.2 2.5-inch enterprise solid-state drives', 'photo_1_2026-06-01_07-56-21.jpg'),
    images: [img('Dell EMC Intel DC P4510 Series 1.0TB NVMe U.2 2.5-inch enterprise solid-state drives', 'photo_1_2026-06-01_07-56-21.jpg')],
    rating: 4.8,
    specs: {
      Model: 'SSDPE2KX010T8D / Dell PN: 0VY9M',
      Brand: 'Dell EMC / Intel',
      Capacity: '1.0 TB',
      Interface: 'PCIe NVMe 3.1 x4',
      'Form Factor': 'U.2 2.5-inch 15mm',
      NAND: 'Intel 3D NAND TLC',
      'Sequential Read': 'Up to 2,850 MB/s',
      'Sequential Write': 'Up to 1,100 MB/s',
      Endurance: '1.92 PBW / 1.0 DWPD'
    }
  },
  {
    id: 'cisco-qsfp-40g-sr4',
    name: 'Cisco QSFP-40G-SR4 40GBASE-SR4 QSFP+ Transceiver Module',
    category: 'networking',
    price: 0,
    description: 'The Cisco QSFP-40G-SR4 is a hot-swappable 40G optical transceiver module designed for short-reach fiber links. It operates at 850nm wavelengths over multimode fiber (MMF), supporting links up to 100 meters on OM3 fiber and 150 meters on OM4 fiber. It uses an MPO/MTP-12 connector configuration.',
    image: img('Cisco QSFP-40G-SR4', 'photo_1_2026-06-01_07-56-43.jpg'),
    images: [img('Cisco QSFP-40G-SR4', 'photo_1_2026-06-01_07-56-43.jpg')],
    rating: 4.8,
    specs: {
      Model: 'QSFP-40G-SR4',
      Brand: 'Cisco Systems',
      Type: 'QSFP+ Transceiver Module',
      Cabling: 'OM3 / OM4 Multimode Fiber (MMF)',
      Connector: 'MPO-12 Duplex',
      Speed: '40 Gbps',
      Wavelength: '850 nm',
      Distance: '100m (OM3) / 150m (OM4)'
    }
  },
  {
    id: 'mellanox-linkx-qsfp28-100g',
    name: 'Mellanox MMA1B00-C100D LinkX 100GBASE-SR4 QSFP28 Optical Transceiver',
    category: 'networking',
    price: 0,
    description: 'The Mellanox MMA1B00-C100D LinkX is a high-speed 100Gb/s optical transceiver module designed for spine-leaf switches and InfiniBand routers. Utilizing 4-channel 850nm VCSEL lasers, it supports connections up to 100 meters over OM4 multimode fiber, terminating in a standard MPO-12 connector.',
    image: img('Mellanox Link X QSFP28 100Gbs', 'photo_1_2026-06-01_07-57-05.jpg'),
    images: [img('Mellanox Link X QSFP28 100Gbs', 'photo_1_2026-06-01_07-57-05.jpg')],
    rating: 4.8,
    specs: {
      Model: 'MMA1B00-C100D',
      Brand: 'Mellanox (NVIDIA)',
      Type: 'QSFP28 Transceiver Module',
      Interface: 'MPO-12 Optical Connector',
      Speed: '100 Gbps',
      Wavelength: '850 nm VCSEL',
      Distance: '70m (OM3) / 100m (OM4)',
      Features: 'Digital Diagnostic Monitoring (DDM)'
    }
  },
  {
    id: 'mellanox-connectx5-25gbe-dual',
    name: 'Mellanox ConnectX-5 EN MCX512A-ADAT Dual-Port 25GbE SFP28 PCIe Network Adapter',
    category: 'networking',
    price: 0,
    description: 'The Mellanox ConnectX-5 EN (MCX512A-ADAT) is a dual-port 25GbE network interface card designed for cloud hosts, virtualization, and flash storage. With a PCIe 3.0 x8 interface, it features hardware offloads for VXLAN, NVGRE, and RoCE v2, enabling exceptional processing speeds and low host CPU utilization.',
    image: img('Mellanox ConnectX-5 EN Dual-Port 25GbE SFP28 Network Interface Card (NIC)', 'photo_1_2026-06-01_07-57-37.jpg'),
    images: [
      img('Mellanox ConnectX-5 EN Dual-Port 25GbE SFP28 Network Interface Card (NIC)', 'photo_1_2026-06-01_07-57-37.jpg'),
      img('Mellanox ConnectX-5 EN Dual-Port 25GbE SFP28 Network Interface Card (NIC)', 'photo_2_2026-06-01_07-57-37.jpg')
    ],
    rating: 4.9,
    specs: {
      Model: 'MCX512A-ADAT',
      Brand: 'Mellanox (NVIDIA)',
      Speed: '10G / 25G Ethernet',
      Ports: '2 x SFP28 Slots',
      Interface: 'PCIe 3.0 x8 (compatible with x16)',
      Offloads: 'VXLAN, NVGRE, RoCE v2, SR-IOV, ASAP2',
      OS: 'Windows, Linux, VMware ESXi'
    }
  },
  {
    id: 'intel-xxv710-da2-25g',
    name: 'Intel Ethernet Network Adapter XXV710-DA2 Dual-Port SFP28 25GbE',
    category: 'networking',
    price: 0,
    description: 'The Intel XXV710-DA2 is a dual-port 25GbE SFP28 PCIe network card designed for server consolidation and data centers. Operating on a PCIe 3.0 x8 slot, it supports network virtualization offloads, Intel Flow Director, and provides backward compatibility to 10GbE, enabling a smooth path to high-speed migrations.',
    image: img('Intel-XXV710-DA2-25G Dual SFP Port', 'photo_1_2026-06-01_07-48-53.jpg'),
    images: [
      img('Intel-XXV710-DA2-25G Dual SFP Port', 'photo_1_2026-06-01_07-48-53.jpg'),
      img('Intel-XXV710-DA2-25G Dual SFP Port', 'photo_2_2026-06-01_07-48-53.jpg'),
      img('Intel-XXV710-DA2-25G Dual SFP Port', 'photo_3_2026-06-01_07-48-53.jpg'),
      img('Intel-XXV710-DA2-25G Dual SFP Port', 'photo_4_2026-06-01_07-48-53.jpg'),
      img('Intel-XXV710-DA2-25G Dual SFP Port', 'photo_5_2026-06-01_07-48-53.jpg'),
      img('Intel-XXV710-DA2-25G Dual SFP Port', 'photo_6_2026-06-01_07-48-53.jpg')
    ],
    rating: 4.8,
    specs: {
      Model: 'XXV710DA2',
      Brand: 'Intel',
      Speed: '10/25 Gbps per port',
      Ports: '2 x SFP28 Ports',
      Interface: 'PCIe 3.0 x8',
      Controller: 'Intel Ethernet Controller XXV710-AM2',
      Features: 'Intel Flow Director, VXLAN, NVGRE, SR-IOV'
    }
  },
  {
    id: 'dell-r640-poweredge',
    name: 'Dell PowerEdge R640 1U Dual-Socket Rack Server',
    category: 'servers',
    price: 0,
    description: 'The Dell PowerEdge R640 is a high-performance 1U, two-socket rack server designed to handle demanding enterprise data center workloads. Supporting dual Intel Xeon Scalable processors and up to 3TB DDR4 RAM, this server offers the optimal mix of compute capacity, NVMe storage density, and redundancy for virtualization and heavy applications.',
    image: img('Dell R 640 Power Edge Server', 'photo_1_2026-06-01_07-50-25.jpg'),
    images: [
      img('Dell R 640 Power Edge Server', 'photo_1_2026-06-01_07-50-25.jpg'),
      img('Dell R 640 Power Edge Server', 'photo_2_2026-06-01_07-50-25.jpg'),
      img('Dell R 640 Power Edge Server', 'photo_3_2026-06-01_07-50-25.jpg'),
      img('Dell R 640 Power Edge Server', 'photo_4_2026-06-01_07-50-25.jpg'),
      img('Dell R 640 Power Edge Server', 'photo_5_2026-06-01_07-50-25.jpg'),
      img('Dell R 640 Power Edge Server', 'photo_6_2026-06-01_07-50-26.jpg'),
      img('Dell R 640 Power Edge Server', 'photo_7_2026-06-01_07-50-26.jpg')
    ],
    rating: 4.9,
    specs: {
      Model: 'PowerEdge R640',
      Brand: 'Dell Technologies',
      'Form Factor': '1U Rack Server',
      Processor: 'Dual Intel Xeon Scalable Processors (Gen 1 / Gen 2)',
      Memory: '24 x DDR4 DIMM slots (Up to 3.0TB LRDIMM)',
      'Drive Bays': 'Up to 8 or 10 x 2.5" SFF SAS/SATA/NVMe',
      RAID: 'PERC H330, H730P, H740P Controllers Supported',
      Manageability: 'iDRAC9 Enterprise with Lifecycle Controller'
    }
  },
  {
    id: 'fujitsu-1g-four-port-lan',
    name: 'Fujitsu D3045-A11 Quad-Port 1GbE PCIe Ethernet Network Card',
    category: 'networking',
    price: 0,
    description: 'The Fujitsu D3045-A11 is a quad-port 1Gbps Ethernet PCI-e network interface card. Based on the Intel i350-AM4 controller, it is designed to deliver stable network virtualization and load balancing, making it ideal for multi-homed server applications and firewall gateways.',
    image: img('FUJITSU 1G Four Port Ethernet Lan Card', 'photo_1_2026-06-01_07-51-42.jpg'),
    images: [
      img('FUJITSU 1G Four Port Ethernet Lan Card', 'photo_1_2026-06-01_07-51-42.jpg'),
      img('FUJITSU 1G Four Port Ethernet Lan Card', 'photo_2_2026-06-01_07-51-42.jpg'),
      img('FUJITSU 1G Four Port Ethernet Lan Card', 'photo_3_2026-06-01_07-51-42.jpg'),
      img('FUJITSU 1G Four Port Ethernet Lan Card', 'photo_4_2026-06-01_07-51-42.jpg')
    ],
    rating: 4.6,
    specs: {
      Model: 'D3045-A11',
      Brand: 'Fujitsu',
      Speed: '1 Gbps per port',
      Ports: '4 x RJ-45 Copper Ports',
      Interface: 'PCIe 2.1 x4',
      Controller: 'Intel i350-AM4 Controller',
      Features: 'Virtual Machine Device Queues (VMDq), SR-IOV'
    }
  },
  {
    id: 'fujitsu-d3045-a11-quad-port',
    name: 'Fujitsu D3045-A11 Quad-Port 1GbE PCIe Ethernet Network Card (Bulk Edition)',
    category: 'networking',
    price: 0,
    description: 'A bulk-packaged edition of the Fujitsu D3045-A11 quad-port 1Gbps network adapter card. Powered by the Intel i350 controller, it supports full hardware acceleration, energy-efficient ethernet, and redundant network interface card (NIC) teaming configurations.',
    image: img('FUJITSU D3045-A11-Quad port Erhernet Lan Card', 'photo_1_2026-06-01_07-51-04.jpg'),
    images: [
      img('FUJITSU D3045-A11-Quad port Erhernet Lan Card', 'photo_1_2026-06-01_07-51-04.jpg'),
      img('FUJITSU D3045-A11-Quad port Erhernet Lan Card', 'photo_2_2026-06-01_07-51-04.jpg'),
      img('FUJITSU D3045-A11-Quad port Erhernet Lan Card', 'photo_3_2026-06-01_07-51-04.jpg'),
      img('FUJITSU D3045-A11-Quad port Erhernet Lan Card', 'photo_4_2026-06-01_07-51-04.jpg'),
      img('FUJITSU D3045-A11-Quad port Erhernet Lan Card', 'photo_5_2026-06-01_07-51-04.jpg'),
      img('FUJITSU D3045-A11-Quad port Erhernet Lan Card', 'photo_6_2026-06-01_07-51-04.jpg'),
      img('FUJITSU D3045-A11-Quad port Erhernet Lan Card', 'photo_7_2026-06-01_07-51-04.jpg'),
      img('FUJITSU D3045-A11-Quad port Erhernet Lan Card', 'photo_8_2026-06-01_07-51-04.jpg'),
      img('FUJITSU D3045-A11-Quad port Erhernet Lan Card', 'photo_9_2026-06-01_07-51-04.jpg'),
      img('FUJITSU D3045-A11-Quad port Erhernet Lan Card', 'photo_10_2026-06-01_07-51-04.jpg')
    ],
    rating: 4.7,
    specs: {
      Model: 'D3045-A11 (Bulk Pack)',
      Brand: 'Fujitsu',
      Speed: '1 Gbps per port',
      Ports: '4 x RJ-45 Ports',
      Interface: 'PCIe 2.1 x4',
      Controller: 'Intel i350 Controller',
      Features: 'Virtual Machine Device Queues (VMDq), SR-IOV'
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
