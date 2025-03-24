import os
from PIL import Image, ImageDraw

# Create a new image with a black background
width, height = 500, 500
image = Image.new('RGBA', (width, height), color=(8, 8, 16, 255))
draw = ImageDraw.Draw(image)

# Define colors
premium_blue = (67, 56, 202, 255)  # #4338CA
lighter_blue = (59, 130, 246, 255)  # #3B82F6
dark_blue1 = (45, 58, 140, 255)  # #2D3A8C
dark_blue2 = (30, 58, 138, 255)  # #1E3A8A

# Draw the N shape (simplified version)
n_shape = [
    (190, 190),  # top-left
    (230, 190),  # top-mid-left
    (230, 250),  # mid-mid-left
    (270, 190),  # top-mid-right
    (310, 190),  # top-right
    (310, 310),  # bottom-right
    (270, 310),  # bottom-mid-right
    (270, 250),  # mid-mid-right
    (230, 310),  # bottom-mid-left
    (190, 310),  # bottom-left
    (190, 190),  # back to top-left
]

# Fill with a gradient-like effect
for y in range(190, 311):
    progress = (y - 190) / 120  # 0 to 1 progress
    r = int(premium_blue[0] + (lighter_blue[0] - premium_blue[0]) * progress)
    g = int(premium_blue[1] + (lighter_blue[1] - premium_blue[1]) * progress)
    b = int(premium_blue[2] + (lighter_blue[2] - premium_blue[2]) * progress)
    
    # Draw a horizontal line through the N shape at this y position
    for x in range(190, 311):
        # Simple point-in-polygon test (simplified for rectangular regions)
        if (x >= 190 and x <= 230 and y >= 190 and y <= 310) or \
           (x >= 270 and x <= 310 and y >= 190 and y <= 310) or \
           (y >= 190 and y <= 310 and 
            ((y - 190) >= (310 - 190) * (x - 190) / (310 - 190) and x >= 190 and x <= 310)):
            draw.point((x, y), fill=(r, g, b, 255))

# Draw the 3D side effect
side1 = [(190, 310), (190, 320), (270, 320), (270, 310)]
side2 = [(310, 310), (310, 320), (270, 320), (270, 310)]
draw.polygon(side1, fill=dark_blue1)
draw.polygon(side2, fill=dark_blue2)

# Draw a subtle circle around the logo
draw.ellipse((100, 100, 400, 400), outline=(67, 56, 202, 75), width=1)

# Save the image
image.save('logo.png')
print("Generated logo.png") 