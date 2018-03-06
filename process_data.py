import csv
import json

options = {
    'Strongly Disagree': 0,
    'Disagree': 1,
    'Neutral': 2,
    'Agree': 3,
    'Strongly Agree': 4
}

categories = {}
questions = []
candidates = {}
races = []

with open('data/categories.csv', 'rU') as csvfile:

    reader = csv.reader(csvfile)
    next(reader)

    for i, row in enumerate(reader):

        categories[row[1]] = {
            'id': i,
            'name': row[0],
            'slug': row[1],
            'type': row[2]
        }

with open('data/questions.csv', 'rU') as csvfile:

    reader = csv.reader(csvfile)
    next(reader)

    for i, row in enumerate(reader):
        cat = row[1]

        questions.append({
            'id': i,
            'body': row[0],
            'category': row[1],
            'direction': row[2],
            'formId': row[3]
        })

class Candidate:

    def __init__(self, name, id, profile):

        self.name = name
        self.id = id
        self.profile = profile

        self.answers = [0 for q in questions]
        self.answers_count = [0 for q in questions]

    def add_response(self, score, question):

        if question['direction'] == 'down':
            score = 4 - score

        self.answers[question['id']] += score
        self.answers_count[question['id']] += 1

    def get_answers(self):

        answers = []

        for i, answer in enumerate(self.answers):

            if self.answers_count[i] > 0:
                answers.append(float(answer) / float(self.answers_count[i]))
            else:
                answers.append(None)

        return answers

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'profile': self.profile,
            'answers': self.get_answers()
        }

with open('data/candidates.csv', 'rU') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)

    for row in reader:
        candidates[row[0]] = Candidate(row[0], int(row[1]), row[2])

with open('data/races.csv', 'rU') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)

    for row in reader:
        races.append({
            'title': row[0],
            'candidates': [int(i) for i in row[1].split(',')]
        })

with open('data/responses.csv', 'rU') as csvfile:

    reader = csv.reader(csvfile)
    next(reader)

    for row in reader:

        candidate = candidates[row[1]]

        for i, response in enumerate(row[3:]):
            if response:
                #score = options[response]
                score = int(response) - 1
                candidate.add_response(score, questions[i])

def get_candidates(candidates):

    result = [None for c in candidates]

    for slug in candidates:
        c = candidates[slug]
        result[c.id] = c.to_json()

    return result

data = {
    'categories': categories,
    'candidates': get_candidates(candidates),
    'questions': questions,
    'races': races
}

with open('data/data.json', 'w') as outfile:
    json.dump(data, outfile)
