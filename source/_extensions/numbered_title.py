from docutils import nodes
from docutils.parsers.rst import Directive

class NumberedSectionDirective(Directive):
    required_arguments = 0
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {}
    has_content = True

    def run(self):
        env = self.state.document.settings.env

        if not hasattr(env, 'numbered_section_counter'):
            env.numbered_section_counter = 0
        env.numbered_section_counter += 1

        title_text = 'Exercice'
        section_id = f'section-{env.numbered_section_counter}'
        section_title = f'{title_text} {env.numbered_section_counter}'

        section_node = nodes.section(ids=[section_id])
        title_node = nodes.title(text=section_title)
        section_node += title_node

        self.state.nested_parse(self.content, self.content_offset, section_node)

        # Créer le lien pour la table des matières sans ajouter l'identifiant au document
        toctree_node = nodes.raw('', f'{section_id}\n', format='html')
        return [section_node]

def setup(app):
    app.add_directive('exercice', NumberedSectionDirective)
    return {'version': '1.0', 'parallel_read_safe': True}
