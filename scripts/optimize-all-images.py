import os
import re
import sys
from PIL import Image

# Base directories
base_dir = r"c:\Users\DCL\Desktop\inovexabd.com\public\Products-image"
products_ts_path = r"c:\Users\DCL\Desktop\inovexabd.com\src\data\products.ts"

def optimize_all_images():
    print("Scanning product images for WebP optimization...")
    extensions = {'.jpg', '.jpeg', '.png'}
    
    # Map from (folder, original_file) -> (original_path, target_path, new_file)
    mapping = {}
    
    # Keep track of target paths to avoid collisions
    generated_paths = set()

    for root, dirs, files in os.walk(base_dir):
        # Skip Hero-images and all-image directories
        root_lower = root.lower()
        if "hero-images" in root_lower or "all-image" in root_lower:
            continue
            
        rel_folder = os.path.relpath(root, base_dir)
        folder_name = "" if rel_folder == "." else rel_folder

        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in extensions:
                orig_path = os.path.join(root, file)
                base_name = os.path.splitext(file)[0]
                
                # Target output path
                new_file = f"{base_name}.webp"
                target_path = os.path.join(root, new_file)
                
                # Handle potential collisions
                counter = 1
                while target_path in generated_paths or (os.path.exists(target_path) and new_file != file):
                    new_file = f"{base_name}_{counter}.webp"
                    target_path = os.path.join(root, new_file)
                    counter += 1
                
                generated_paths.add(target_path)
                mapping[(folder_name, file)] = (orig_path, target_path, new_file)

    total_files = len(mapping)
    print(f"Found {total_files} images to optimize.")

    # Load products.ts content
    if os.path.exists(products_ts_path):
        with open(products_ts_path, 'r', encoding='utf-8') as f:
            products_content = f.read()
    else:
        print(f"Warning: {products_ts_path} not found. References will not be updated.")
        products_content = None

    processed_count = 0
    updated_refs_count = 0
    total_saved_kb = 0

    for (folder, file), (orig_path, target_path, new_file) in mapping.items():
        processed_count += 1
        print(f"[{processed_count}/{total_files}] Optimizing: {os.path.join(folder, file)}")
        
        try:
            # Open image
            img = Image.open(orig_path)
            
            # Check dimensions and resize if necessary (max dimension 1200px)
            width, height = img.size
            max_dim = 1200
            if width > max_dim or height > max_dim:
                if width > height:
                    new_width = max_dim
                    new_height = int(height * (max_dim / width))
                else:
                    new_height = max_dim
                    new_width = int(width * (max_dim / height))
                print(f"  Resizing from {width}x{height} to {new_width}x{new_height}")
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Save as WebP
            img.save(target_path, 'WEBP', quality=80)
            
            orig_size = os.path.getsize(orig_path) / 1024
            new_size = os.path.getsize(target_path) / 1024
            saved = orig_size - new_size
            total_saved_kb += saved
            
            print(f"  Saved as WebP: {orig_size:.1f} KB -> {new_size:.1f} KB (Saved {saved:.1f} KB)")
            
            # Delete original if it was not already WebP (which it isn't, but let's check path)
            if orig_path != target_path:
                os.remove(orig_path)
                print(f"  Removed original file: {file}")
                
            # Update references in products.ts
            if products_content and folder:
                pattern = r"img\(\s*['\"]" + re.escape(folder) + r"['\"]\s*,\s*['\"]" + re.escape(file) + r"['\"]\s*\)"
                replacement = f"img('{folder}', '{new_file}')"
                
                if re.search(pattern, products_content):
                    products_content, count = re.subn(pattern, replacement, products_content)
                    updated_refs_count += count
                    print(f"  Updated {count} reference(s) in products.ts")
                    
        except Exception as e:
            print(f"  Error optimizing {file}: {e}")

    # Write back updated products.ts
    if products_content:
        with open(products_ts_path, 'w', encoding='utf-8') as f:
            f.write(products_content)
        print(f"Successfully updated products.ts references (Total {updated_refs_count} matches replaced).")

    print(f"\nOptimization complete! Total size saved: {total_saved_kb / 1024:.2f} MB")

if __name__ == '__main__':
    optimize_all_images()
