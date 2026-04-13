#!/usr/bin/env python3
import fitz  # PyMuPDF
import os
from pathlib import Path

home = os.path.expanduser("~")
project_dir = os.path.join(home, "Projects", "fail-bootcamp-jmenovky")
screenshots_dir = os.path.join(project_dir, "screenshots")

# Page size in points (72 points = 1 inch, 80mm = 226.77 points, 50mm = 141.73 points)
PAGE_WIDTH = 80 * 72 / 25.4  # 80mm in points
PAGE_HEIGHT = 50 * 72 / 25.4  # 50mm in points

def create_pdf(image_files, output_path):
    doc = fitz.open()
    
    for img_path in image_files:
        # Create a new page with exact dimensions
        page = doc.new_page(width=PAGE_WIDTH, height=PAGE_HEIGHT)
        
        # Insert the image to fill the entire page
        rect = fitz.Rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT)
        page.insert_image(rect, filename=img_path)
    
    doc.save(output_path, garbage=4, deflate=True)
    doc.close()
    return len(image_files)

# Get badge screenshots (sorted)
badge_files = sorted([
    os.path.join(screenshots_dir, f) 
    for f in os.listdir(screenshots_dir) 
    if f.startswith('badge-') and f != 'badge-empty.png'
])

empty_file = os.path.join(screenshots_dir, 'badge-empty.png')

# Create main PDF
output_main = os.path.join(home, "Downloads", "FAIL-jmenovky-79ks-FINAL.pdf")
count = create_pdf(badge_files, output_main)
size_mb = os.path.getsize(output_main) / 1024 / 1024
print(f"✓ Created: FAIL-jmenovky-79ks-FINAL.pdf ({count} pages, {size_mb:.1f} MB)")

# Create empty badge PDF
output_empty = os.path.join(home, "Downloads", "FAIL-jmenovka-prazdna-FINAL.pdf")
create_pdf([empty_file], output_empty)
size_kb = os.path.getsize(output_empty) / 1024
print(f"✓ Created: FAIL-jmenovka-prazdna-FINAL.pdf (1 page, {size_kb:.0f} KB)")

print(f"\nPage size: {PAGE_WIDTH:.1f} x {PAGE_HEIGHT:.1f} points = 80 x 50 mm")
print("Ready for print!")
