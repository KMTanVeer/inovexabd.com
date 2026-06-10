import os
from PIL import Image

def optimize():
    base_dir = r"c:\Users\DCL\Desktop\inovexabd.com\public"
    
    # List of targets: (is_hero, folder, file_name, max_dim, quality)
    targets = [
        (False, 'INTEL SSD DC S4500 SERIES 2.5 6GAbs SATA SSD 240GB', 'photo_1_2026-05-31_10-24-02.webp', 500, 75),
        (False, 'INTEL SSD D3  S4510 SERIES 2.5 6GAbs SATA SSD 480 GB', 'INTEL SSD D3  S4510 SERIES 2.5 6GAbs SATA SSD 480 GB.webp', 500, 75),
        (False, 'PCIE 3.0 X82 Port SFP10G Lan Card Model No  INTEL X710 DA2', 'photo_1_2026-05-31_10-25-03.webp', 500, 75),
        (False, 'HGST 12 TB  10K RPM', 'photo_1_2026-05-31_10-45-21.webp', 500, 75),
        (False, 'Mellanox 40G 2 Port SFP LAN CARD', 'photo_1_2026-05-31_10-46-45.webp', 500, 75),
        (False, 'HPE 768TB SSD NVMe', 'photo_1_2026-05-31_10-44-55.webp', 500, 75),
        (False, 'Dell R 640 Power Edge Server', 'photo_1_2026-06-01_07-50-25.webp', 500, 75),
        (False, 'Dell PowerEdge R630', 'dell poweredge.webp', 500, 75),
        (False, 'Cisco Nexus N9K C93180YC EX', '1_1.webp', 500, 75),
        (True, 'Hero-images', 'dell-server-hero.webp', 600, 75),
        (False, 'juniper mx80 universal router', '1.webp', 500, 75)
    ]
    
    total_saved_kb = 0
    
    for is_hero, folder, file_name, max_dim, quality in targets:
        if is_hero:
            filepath = os.path.join(base_dir, 'Hero-images', file_name)
        else:
            filepath = os.path.join(base_dir, 'Products-image', folder, file_name)
            
        if not os.path.exists(filepath):
            print(f"File not found: {filepath}")
            continue
            
        try:
            orig_size = os.path.getsize(filepath) / 1024
            img = Image.open(filepath)
            width, height = img.size
            
            # Resize
            if width > max_dim or height > max_dim:
                if width > height:
                    new_width = max_dim
                    new_height = int(height * (max_dim / width))
                else:
                    new_height = max_dim
                    new_width = int(width * (max_dim / height))
                print(f"Resizing {folder}/{file_name} from {width}x{height} to {new_width}x{new_height}")
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Save in place as WebP with higher compression
            img.save(filepath, 'WEBP', quality=quality)
            
            new_size = os.path.getsize(filepath) / 1024
            saved = orig_size - new_size
            total_saved_kb += saved
            print(f"Optimized: {folder}/{file_name} | {orig_size:.1f} KB -> {new_size:.1f} KB (Saved {saved:.1f} KB, quality={quality})")
            
        except Exception as e:
            print(f"Error optimizing {folder}/{file_name}: {e}")
            
    print(f"\nTotal size saved: {total_saved_kb:.1f} KB ({total_saved_kb / 1024:.2f} MB)")

if __name__ == '__main__':
    optimize()
