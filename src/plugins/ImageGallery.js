import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Command from '@ckeditor/ckeditor5-core/src/command';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import ButtonIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

class InsertImage extends Command {
  execute({ src, alt }) {
    const editor = this.editor;

    editor.model.change((writer) => {
      const imageElement = writer.createElement('image', {
        src: src,
        alt: alt,
      });

      editor.model.insertContent(imageElement, editor.model.document.selection);

      editor.config.get('imageGallery').setShowImagesList(false);
    });
  }
}

export default class ImageGallery extends Plugin {
  init() {
    const editor = this.editor;

    editor.commands.add('imageGallery', new InsertImage(editor));

    editor.ui.componentFactory.add('imageGallery', (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: locale.t('Insert image'),
        icon: ButtonIcon,
        tooltip: true,
      });

      view.on('execute', () => {
        editor.config
          .get('imageGallery')
          .setShowImagesList(!editor.config.get('imageGallery').showImagesList);
      });

      return view;
    });
  }
}
