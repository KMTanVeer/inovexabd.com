import os
from PIL import Image

def optimize_images():
    base_dir = os.path.join(os.getcwd(), 'public', 'Products-image')
    
    target_folders = [
        'Dell Broadcom 57412 dual-port 10GbE SFP+ network adapter',
        'Dell PowerEdge NVMe PCIe Extender Expansion Card',
        'MikroTik RouterOS x86 Level 6 License Pre-Installed 2.5 SATA SSD',
        'NVIDIA Mellanox MC2210411-SR4 QSFP+ transceivers',
        'Supermicro 10 G dual port SFP LAN Card version 2.10',
        'Cisco QSFP-40G-SR4 40GBASE-SR4 QSFP+ Transceiver Module',
        'Cisco Nexus 92160YC-X Switch',
        'Cisco Nexus N3K-3064PQ-10GX –48-Port 10G SFP+ Switch'
    ]
    
    total_saved = 0
    
    for folder in target_folders:
        folder_path = os.path.join(base_dir, folder)
        if not os.path.exists(folder_path):
            print(f"Folder not found: {folder_path}")
            continue
            
        print(f"\nProcessing folder: {folder}")
        files = os.listdir(folder_path)
        for filename in files:
            ext = os.path.splitext(filename)[1].lower()
            if ext in ['.jpg', '.jpeg', '.png']:
                filepath = os.path.join(folder_path, filename)
                
                try:
                    # Open image
                    img = Image.open(filepath)
                    
                    # Target output path
                    output_filename = os.path.splitext(filename)[0] + '.webp'
                    output_filepath = os.path.join(folder_path, output_filename)
                    
                    # Check dimensions and resize if necessary
                    width, height = img.size
                    max_dim = 1200
                    if width > max_dim or height > max_dim:
                        if width > height:
                            new_width = max_dim
                            new_height = int(height * (max_dim / width))
                        else:
                            new_height = max_dim
                            new_width = int(width * (max_dim / height))
                        print(f"  Resizing {filename} from {width}x{height} to {new_width}x{new_height}")
                        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                    
                    # Convert color mode to RGB if RGBA (WebP doesn't strictly need it, but it's cleaner)
                    if img.mode in ('RGBA', 'LA'):
                        background = Image.new('RGB', img.size, (255, 255, 255))
                        background.paste(img, mask=img.split()[3])
                        img = background
                    
                    # Save as WebP
                    img.save(output_filepath, 'WEBP', quality=80)
                    
                    orig_size = os.path.getsize(filepath) / 1024
                    new_size = os.path.getsize(output_filepath) / 1024
                    saved = orig_size - new_size
                    total_saved += saved
                    print(f"  Optimized {filename} -> {output_filename}: {orig_size:.1f} KB -> {new_size:.1f} KB (Saved {saved:.1f} KB)")
                    
                    # Delete original
                    os.remove(filepath)
                    
                except Exception as e:
                    print(f"  Error processing {filename}: {e}")

    print(f"\nOptimization complete! Total size saved: {total_saved/1024:.2f} MB")

if __name__ == '__main__':
    optimize_images()
