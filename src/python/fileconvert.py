import json
import csv

def coco_to_vertexai_csv(coco_file, csv_file, image_base_uri):
    # Load COCO annotations
    with open(coco_file, 'r') as f:
        coco_data = json.load(f)
    
    # Mapping for image id to file name and dimensions
    images_info = {image['id']: {'file_name': image['file_name'], 'height': image['height'], 'width': image['width']} for image in coco_data['images']}
    
    # Mapping for category id to category name
    categories = {category['id']: category['name'] for category in coco_data['categories']}
    
    with open(csv_file, mode='w', newline='') as file:
        writer = csv.writer(file)
        
        # Write the CSV header
        writer.writerow(["ML_USE", "GCS_FILE_PATH", "LABEL", "X_MIN", "Y_MIN", "X_MAX", "Y_MIN", "X_MAX", "Y_MAX", "X_MIN", "Y_MAX"])
        
        for annotation in coco_data['annotations']:
            image_id = annotation['image_id']
            category_id = annotation['category_id']
            bbox = annotation['bbox']  # Format: [x, y, width, height]
            
            image_info = images_info[image_id]
            category_name = categories[category_id]
            
            # Normalize coordinates
            x_min = bbox[0] / image_info['width']
            y_min = bbox[1] / image_info['height']
            x_max = (bbox[0] + bbox[2]) / image_info['width']
            y_max = (bbox[1] + bbox[3]) / image_info['height']
            
            # Construct GCS URI
            gcs_uri = f"{image_base_uri}/{image_info['file_name']}"
            
            # Assuming ML_USE needs to be manually set or derived from some logic
            ml_use = "VALIDATION"  # Placeholder for ML_USE logic
            
            # Write row to CSV
            writer.writerow([ml_use, gcs_uri, category_name, x_min, y_min, "", "", x_max, y_max, "", ""])


def coco_to_vertexai(coco_file, output_file, image_base_uri, annotation_set_name="my_annotation_set", env="prod", ml_use="train"):
    # Load COCO annotations
    with open(coco_file, 'r') as f:
        coco_data = json.load(f)

    # Prepare the conversion
    categories = {category['id']: category['name'] for category in coco_data['categories']}
    vertexai_annotations = []

    for image in coco_data['images']:
        image_annotations = {
            "imageGcsUri": f"{image_base_uri}/{image['file_name']}",
            "boundingBoxAnnotations": []
        }

        # Filter annotations for this image
        for annotation in filter(lambda ann: ann['image_id'] == image['id'], coco_data['annotations']):
            category_name = categories[annotation['category_id']]
            x, y, width, height = annotation['bbox']
            x_min, y_min, x_max, y_max = x, y, x + width, y + height

            bounding_box_annotation = {
                "displayName": category_name,
                "xMin": x_min,
                "yMin": y_min,
                "xMax": x_max,
                "yMax": y_max,
                "annotationResourceLabels": {
                    "aiplatform.googleapis.com/annotation_set_name": annotation_set_name,
                    "env": env
                }
            }

            image_annotations["boundingBoxAnnotations"].append(bounding_box_annotation)

        image_annotations["dataItemResourceLabels"] = {
            "aiplatform.googleapis.com/ml_use": ml_use
        }

        vertexai_annotations.append(image_annotations)

    # Save to new JSON file
    with open(output_file, 'w') as f:
        json.dump(vertexai_annotations, f, indent=4)

# Example usage
image_base_uri = 'gs://laundry_symbols_test/Laundry Coach v1i Coco/valid'


if __name__ == "__main__":
    path = input("dataset file: \n")
    outpath = input("output file: \n")
    coco_to_vertexai_csv(path, outpath, image_base_uri=image_base_uri, )
    #coco_to_vertexai(path, outpath, image_base_uri, ml_use="test")