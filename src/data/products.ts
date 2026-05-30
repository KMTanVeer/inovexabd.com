import { LucideIcon, Network, Cpu, Server, Cable, Watch, Headphones, Gamepad2, Mouse, Keyboard, Smartphone, Zap } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
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
    id: 'computing',
    name: 'Computing',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80',
    description: 'High-performance RAM, processors, and PC accessories.'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: Gamepad2,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
    description: 'Next-gen gaming gear, mechanical keyboards, and RGB accessories.'
  }
];

export const PRODUCTS: Product[] = [
  // Lan Cards
  {
    id: 'lan-huawei-10g',
    name: 'Huawei 10G Lan Card',
    category: 'networking',
    price: 0,
    description: 'High-performance 10G Ethernet adapter from Huawei, optimized for data-intensive workloads and enterprise networking.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
    rating: 4.8,
    specs: {
      'Interface': 'SFP+',
      'Speed': '10 Gbps',
      'Architecture': 'PCIe Gen 3',
      'Ports': '1x SFP+'
    },
    isFeatured: true
  },
  {
    id: 'lan-intel-x710-10g',
    name: 'Intel X710 10G Lan Card',
    category: 'networking',
    price: 0,
    description: 'Original Intel X710 series network adapter. The industry standard for reliability and performance in high-speed networking.',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80',
    rating: 5.0,
    specs: {
      'Controller': 'Intel X710',
      'Speed': '10 Gbps Dual Port',
      'Interface': 'PCIe 3.0 x8',
      'Virtualization': 'VMDq, SR-IOV'
    },
    isFeatured: true
  },
  {
    id: 'lan-supermicro-10g',
    name: 'Supermicro 10G Lan Card',
    category: 'networking',
    price: 0,
    description: 'Efficient and robust 10G networking from Supermicro. Perfect for server integration.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
    rating: 4.5,
    specs: {
      'Speed': '10 Gbps',
      'Form Factor': 'Standard/Low Profile',
      'Chipset': 'Broadcom/Intel based'
    }
  },
  {
    id: 'lan-mellanox-10g',
    name: 'Mellanox 10G Lan Card',
    category: 'networking',
    price: 0,
    description: 'High-speed 10G Lan card from Mellanox, known for low latency and high throughput.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
    rating: 4.7,
    specs: {
      'Speed': '10 Gbps',
      'Latency': 'Ultra-low',
      'Technology': 'ConnectX Series'
    }
  },
  {
    id: 'lan-intel-40g',
    name: 'Intel 40G Lan Card',
    category: 'networking',
    price: 0,
    description: 'Extreme speed for enterprise backbones. Intel 40G network adapter ensures zero bottlenecking.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80',
    rating: 4.9,
    specs: {
      'Speed': '40 Gbps',
      'Interface': 'QSFP+',
      'Features': 'Data Center Bridging (DCB)'
    }
  },
  {
    id: 'lan-mellanox-40g',
    name: 'Mellanox 40G Lan Card',
    category: 'networking',
    price: 0,
    description: 'Performance-driven 40G networking hardware from Mellanox.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
    rating: 4.6,
    specs: {
      'Speed': '40 Gbps',
      'Port Configuration': '1x QSFP+'
    }
  },
  {
    id: 'lan-broadcom-25g',
    name: 'Broadcom 25G Lan Card',
    category: 'networking',
    price: 0,
    description: 'The sweet spot between 10G and 40G. 25G Broadcom adapter for modern data centers.',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80',
    rating: 4.4,
    specs: {
      'Speed': '25 Gbps',
      'Compatibility': 'SFP28'
    }
  },
  {
    id: 'lan-intel-25g',
    name: 'Intel 25G Lan Card',
    category: 'networking',
    price: 0,
    description: 'Intel 25G Ethernet adapter. High efficiency, high reliability.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
    rating: 4.8,
    specs: {
      'Speed': '25 Gbps',
      'Interface': 'PCIe 3.0 x8'
    }
  },
  // SFP Modules
  {
    id: 'sfp-cisco-10g',
    name: 'Cisco 10G SFP Module',
    category: 'networking',
    price: 0,
    description: 'Genuine Cisco SFP-10G-SR module for short-range fiber connections.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
    rating: 4.9,
    specs: {
      'Type': 'SFP+',
      'Speed': '10 Gbps',
      'Reach': '300m',
      'Cable Type': 'Multimode Fiber'
    }
  },
  {
    id: 'sfp-huawei-10g',
    name: 'Huawei 10G SFP Module',
    category: 'networking',
    price: 0,
    description: 'Huawei high-performance 10G SFP module for enterprise switches.',
    image: 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?auto=format&fit=crop&q=80',
    rating: 4.7,
    specs: {
      'Type': 'SFP+',
      'Speed': '10 Gbps'
    }
  },
  {
    id: 'sfp-cisco-40g',
    name: 'Cisco 40G SFP Module',
    category: 'networking',
    price: 0,
    description: 'Cisco QSFP-40G series transceivers for high-density 40G networking.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
    rating: 4.8,
    specs: {
      'Type': 'QSFP+',
      'Speed': '40 Gbps'
    }
  },
  {
    id: 'sfp-huawei-40g',
    name: 'Huawei 40G SFP Module',
    category: 'networking',
    price: 0,
    description: 'High-speed 40G QSFP module from Huawei.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80',
    rating: 4.5,
    specs: {
      'Type': 'QSFP+',
      'Speed': '40 Gbps'
    }
  },
  {
    id: 'sfp-mellanox-40g',
    name: 'Mellanox 40G SFP Module',
    category: 'networking',
    price: 0,
    description: 'Low-power, high-reliability 40G SFP module from Mellanox.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
    rating: 4.6,
    specs: {
      'Type': 'QSFP+',
      'Speed': '40 Gbps'
    }
  },
  {
    id: 'sfp-nokia-100g',
    name: 'Nokia 100G SFP Module',
    category: 'networking',
    price: 0,
    description: 'Next-generation 100G connectivity. The Nokia QSFP28 module is built for the future of networking.',
    image: 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?auto=format&fit=crop&q=80',
    rating: 5.0,
    specs: {
      'Type': 'QSFP28',
      'Speed': '100 Gbps',
      'Connector': 'LC'
    },
    isFeatured: true
  },
  // Misc
  {
    id: 'patch-cord-3m',
    name: 'Fiber Patch Cord (3M)',
    category: 'networking',
    price: 0,
    description: 'High-quality 3-meter fiber optic patch cord for server and switch connectivity.',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80',
    rating: 4.6,
    specs: {
      'Length': '3 Meters',
      'Type': 'Fiber Optic',
      'Connector': 'LC-LC'
    }
  },
  {
    id: 'psu-supermicro-750w',
    name: 'Supermicro 750W PSU (EPP)',
    category: 'computing',
    price: 0,
    description: 'Supermicro Titanium/Platinum level redundant power supply unit for high-availability systems.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
    rating: 4.7,
    specs: {
      'Power': '750W',
      'Efficiency': 'Titanium/Platinum EPP',
      'Form Factor': 'Server Redundant'
    }
  },
  // Servers
  {
    id: 'server-sm-4node',
    name: 'Supermicro 4-Node Cluster Server',
    category: 'servers',
    price: 0,
    description: 'Comprehensive high-density 4-node cluster solution. Includes chassis and motherboard. Total price with processors: 132,000 Taka.',
    image: 'https://images.unsplash.com/photo-1558489080-00d07a6833fe?auto=format&fit=crop&q=80',
    rating: 5.0,
    specs: {
      'Architecture': '4-Node (BigTwin)',
      'Nodes': '4 independent systems',
      'Note': 'Requires 8 processors'
    },
    isFeatured: true
  },
  {
    id: 'processor-72core',
    name: '72 Core Processor Unit',
    category: 'computing',
    price: 0,
    description: 'High-core-count enterprise processor for compute-intensive virtualization and data processing.',
    image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80',
    rating: 4.5,
    specs: {
      'Cores': '72 Cores',
      'Type': 'Enterprise Xeon/EPYC based'
    }
  },
  {
    id: 'dell-r630-72c',
    name: 'Dell PowerEdge R630 (72 Core)',
    category: 'servers',
    price: 0,
    description: 'Powerful 1U rack server. Configure with 72 cores for massive multi-threaded performance. Note: Price excludes RAM.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
    rating: 4.8,
    specs: {
      'Model': 'PowerEdge R630',
      'Cores': '72 Cores',
      'Form Factor': '1U Rack',
      'Storage': '8x 2.5" SFF'
    }
  },
  {
    id: 'dell-r630-88c',
    name: 'Dell PowerEdge R630 (88 Core)',
    category: 'servers',
    price: 0,
    description: 'Upgraded 88-core configuration of the legendary R630. Reliable, fast, and dense. Note: Price excludes RAM.',
    image: 'https://images.unsplash.com/photo-1558489106-2d6ec42da696?auto=format&fit=crop&q=80',
    rating: 4.9,
    specs: {
      'Model': 'PowerEdge R630',
      'Cores': '88 Cores',
      'Form Factor': '1U Rack'
    },
    isFeatured: true
  },
  {
    id: 'dell-r640-72c',
    name: 'Dell PowerEdge R640 (72 Core)',
    category: 'servers',
    price: 0,
    description: 'Modern 1U flagship server. Includes Railkit and Bezel. Unmatched performance and management. Note: Price excludes RAM.',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80',
    rating: 5.0,
    specs: {
      'Model': 'PowerEdge R640',
      'Cores': '72 Cores',
      'Inclusions': 'Railkit, Bezel (Vessel)',
      'Form Factor': '1U'
    },
    isFeatured: true
  },
  {
    id: 'dell-r640-80c',
    name: 'Dell PowerEdge R640 (80 Core)',
    category: 'servers',
    price: 0,
    description: '80-core high-performance variant of the R640. Ideal for cloud hosting and large database clusters. Includes Railkit and Bezel.',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80',
    rating: 4.9,
    specs: {
      'Model': 'PowerEdge R640',
      'Cores': '80 Cores',
      'Inclusions': 'Railkit, Bezel'
    }
  },
  {
    id: 'dell-r640-96c',
    name: 'Dell PowerEdge R640 (96 Core)',
    category: 'servers',
    price: 0,
    description: 'The beast - 96 Core Dell R640. Maximum compute density in 1U. Includes Railkit and Bezel. Note: Price excludes RAM.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80',
    rating: 5.0,
    specs: {
      'Model': 'PowerEdge R640',
      'Cores': '96 Cores',
      'Inclusions': 'Railkit, Bezel'
    }
  },
  {
    id: 'dell-r730-72c',
    name: 'Dell PowerEdge R730 (72 Core)',
    category: 'servers',
    price: 0,
    description: '2U versatile server powerhouse. 72 Cores for expandability and high-performance I/O. Includes Railkit and Bezel. Note: Price excludes RAM.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
    rating: 4.8,
    specs: {
      'Model': 'PowerEdge R730',
      'Cores': '72 Cores',
      'Form Factor': '2U Rack',
      'Inclusions': 'Railkit, Bezel'
    }
  },
  // RAM
  {
    id: 'ram-8gb-ddr4',
    name: '8GB DDR4 Enterprise RAM',
    category: 'computing',
    price: 0,
    description: 'Reliable DDR4 memory for servers and enterprise workstations.',
    image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80',
    rating: 4.4,
    specs: {
      'Capacity': '8GB',
      'Type': 'DDR4',
      'ECC': 'Supported'
    }
  },
  {
    id: 'ram-16gb-ddr4',
    name: '16GB DDR4 Enterprise RAM',
    category: 'computing',
    price: 0,
    description: 'High-density DDR4 memory modules for scaling your server infrastructure.',
    image: 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?auto=format&fit=crop&q=80',
    rating: 4.6,
    specs: {
      'Capacity': '16GB',
      'Type': 'DDR4'
    }
  },
  {
    id: 'ram-32gb-ddr4',
    name: '32GB DDR4 Enterprise RAM',
    category: 'computing',
    price: 0,
    description: 'Elite 32GB DDR4 modules for mission-critical applications requiring maximum bandwidth.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
    rating: 5.0,
    specs: {
      'Capacity': '32GB',
      'Type': 'DDR4',
      'Features': 'Buffered, ECC'
    },
    isFeatured: true
  },
  {
    id: 'cisco-nexus-93180yc-ex',
    name: 'Cisco Nexus N9K-C93180YC-EX',
    category: 'networking',
    price: 0,
    description: 'High-performance Data Center switch with 48 x 10/25-Gbps SFP28 ports and 6 x 40/100-Gbps QSFP28 ports.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
    rating: 4.9,
    specs: {
      '10G Ports': '48 x 10G SFP+',
      '25G Ports': '6 x 25G SFP28',
      '40G Ports': '6 x 40G QSFP+',
      'Capacity': '2.56 Tbps'
    }
  },
  {
    id: 'juniper-mx80',
    name: 'Juniper MX80 Universal Router',
    category: 'networking',
    price: 0,
    description: 'Carrier-grade universal routing platform for enterprise and service provider applications.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80',
    rating: 4.8,
    specs: {
      '10G Ports': 'Up to 20 x 10G',
      '40G Ports': 'Up to 8 x 40G',
      '100G Ports': 'Up to 4 x 100G',
      'Capacity': '160 Tbps'
    }
  }
];
