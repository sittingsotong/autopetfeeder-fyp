## Temporary solution to missing dataset.csv file 
import pandas as pd

dict = {
    'img': [],
    'label': []
}

for label in range(0, 105, 5):
    # label is the current label
    for i in range(50):
        # i is the ith image
        # Add img and label to dict
        img = str(label)+"g_"+str(i)+'.png'
        dict['img'].append(img)
        dict['label'].append(label)

df = pd.DataFrame.from_dict(dict)
df.to_csv("dataset.csv", index=False)