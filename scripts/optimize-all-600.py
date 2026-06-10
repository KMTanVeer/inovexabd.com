import os
from PIL import Image

def optimize_all():
    base_dir = r"c:\Users\DCL\Desktop\inovexabd.com\public"
    total_saved_kb = 0
    total_processed = 0
    
    # We will traverse Products-image and Hero-images
    folders = [
        os.path.join(base_dir, 'Products-image'),
        os.path.join(base_dir, 'Hero-images')
    ]
    
    for folder_path in folders:
        if not os.path.exists(folder_path):
            continue
            
        for root, dirs, files in os.walk(folder_path):
            # Skip all-image folder
            if "all-image" in root.lower():
                continue
                
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in ['.webp', '.png', '.jpg', '.jpeg']:
                    filepath = os.path.join(root, file)
                    try:
                        orig_size = os.path.getsize(filepath) / 1024
                        img = Image.open(filepath)
                        width, height = img.size
                        
                        max_dim = 600
                        # For hero images, maybe 800 is safer? No, the lighthouse report states:
                        # "This image file is larger than it needs to be (800x533) for its displayed dimensions (458x305)."
                        # So even for hero images, 600 or 800 is more than enough. Let's use 600 for all.
                        
                        did_resize = False
                        if width > max_dim or height > max_dim:
                            if width > height:
                                new_width = max_dim
                                new_height = int(height * (max_dim / width))
                            else:
                                new_height = max_dim
                                new_width = int(width * (max_dim / height))
                            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                            did_resize = True
                            
                        # Save back as WebP
                        target_path = filepath
                        # If original is png/jpg, we would need to replace it, but they are already mostly webp.
                        # Let's save as webp. If original is webp, save over it. If png/jpg/jpeg, save as webp and we might need to delete.
                        # However, products.ts references them, so it's safer to just overwrite the file in its original format/extension,
                        # or if it's a webp, keep it webp. Since PIL can write webp/png/jpg, let's keep the original format to avoid breaking paths.
                        fmt = img.format if img.format else 'WEBP'
                        if ext == '.webp':
                            img.save(target_path, 'WEBP', quality=75)
                        elif ext in ['.jpg', '.jpeg']:
                            img.save(target_path, 'JPEG', quality=75)
                        elif ext == '.png':
                            # PNG compression
                            img.save(target_path, 'PNG', optimize=True)
                            
                        new_size = os.path.getsize(filepath) / 1024
                        saved = orig_size - new_size
                        if saved > 0:
                            total_saved_kb += saved
                            action = "Resized & Compressed" if did_resize else "Compressed"
                            print(f"{action}: {os.path.relpath(filepath, base_dir)} | {orig_size:.1f} KB -> {new_size:.1f} KB (Saved {saved:.1f} KB)")
                            total_processed += 1
                    except Exception as e:
                        print(f"Error processing {file}: {e}")
                        
    print(f"\nOptimization complete! Processed {total_processed} files. Total saved: {total_saved_kb:.1f} KB ({total_saved_kb / 1024:.2f} MB)")

if __name__ == '__main__':
    optimize_all()
