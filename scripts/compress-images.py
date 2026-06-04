import os
from PIL import Image

def compress_images():
    directory = os.path.join(os.getcwd(), 'src', 'assets', 'Hero-images')
    if not os.path.exists(directory):
        print(f"Directory not found: {directory}")
        return

    images_to_convert = [
        'cisco-hero.png',
        'dell-server-hero.png',
        'intel-ssd-hero.png',
        'juniper-hero.png'
    ]

    for filename in images_to_convert:
        filepath = os.path.join(directory, filename)
        if os.path.exists(filepath):
            print(f"Compressing {filename}...")
            # Open PNG
            img = Image.open(filepath)
            
            # Target output path
            output_filename = filename.rsplit('.', 1)[0] + '.webp'
            output_filepath = os.path.join(directory, output_filename)
            
            # Save as WebP
            img.save(output_filepath, 'WEBP', quality=80)
            
            # Get sizes
            orig_size = os.path.getsize(filepath) / 1024
            new_size = os.path.getsize(output_filepath) / 1024
            print(f"Saved {output_filename}: {orig_size:.1f} KB -> {new_size:.1f} KB")
            
            # Delete original
            os.remove(filepath)
            print(f"Removed original {filename}")
        else:
            print(f"File not found: {filepath}")

if __name__ == '__main__':
    compress_images()
