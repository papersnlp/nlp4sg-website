import json
import random 
import spacy
from tqdm import tqdm 
from spacy.training import Example
from spacy.util import minibatch

class JSONToNERModel:

  def __init__(self, config):
    self.config = config

  def json_to_train_samples(self, path):
    train_samples = []
    samples = None 
    # Read json file 
    with open(path) as json_file:
      samples = json.load(json_file)

    nlp=spacy.load("en_core_web_sm") 
    for sample in samples:
      # Build document from text 
      in_doc = nlp.make_doc(sample['text'])
      # Build entities from json 
      ents = [(span['start'], span['end'], span['label']) for span in sample['spans']]
      print(ents)
      out_ents = { 'entities': ents }
      # Add spacy training Example 
      train_samples.append(Example.from_dict(in_doc, out_ents))

    return train_samples 

  def train_ner_model(self, samples, epochs=100, batch_size=4, dropout=0.4):
    nlp=spacy.load("en_core_web_sm") 
    # Resume training from pretained ner 
    nlp.resume_training()
    # List of pipes you want to train
    pipe_exceptions = ["ner", "trf_wordpiecer", "trf_tok2vec"]
    # List of pipes which should remain unaffected in training
    other_pipes = [pipe for pipe in nlp.pipe_names if pipe not in pipe_exceptions]

    with nlp.disable_pipes(*other_pipes) :
      # Training for 30 iterations     
      for epoch in tqdm(range(epochs)):
        # shuffle examples before training
        random.shuffle(samples)
        # Dictionary to store losses
        losses = {}
        for batch in minibatch(samples, size=batch_size):#, size=sizes):
          nlp.update(batch, losses=losses, drop=dropout)
        print("Losses", losses)
    return nlp 

  def run(self):
    samples = self.json_to_train_samples(self.config.json_in_dir) 
    model = self.train_ner_model(
      samples, 
      epochs=self.config.train.epochs,
      batch_size=self.config.train.batch_size,
      dropout=self.config.train.dropout
    )
    model.to_disk(self.config.ner_out_dir)

    
