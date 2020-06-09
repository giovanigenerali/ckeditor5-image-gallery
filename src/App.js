import React, { useState, useEffect } from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

/** Plugins */
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';

import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import List from '@ckeditor/ckeditor5-list/src/list';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';

import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';

import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';

/** Plugin */
import ImageGallery from './plugins/ImageGallery';
/** Translate */
import './translation/pt-br';

const images = [
  {
    id: 1,
    src: 'http://localhost:3000/assets/product1.jpg',
  },
  {
    id: 2,
    src: 'http://localhost:3000/assets/product2.jpg',
  },
  {
    id: 3,
    src: 'http://localhost:3000/assets/product3.jpg',
  },
  {
    id: 4,
    src: 'http://localhost:3000/assets/product4.jpg',
  },
];

import ImagesList from './components/ImagesList';

export default function App() {
  const [showImagesList, setShowImagesList] = useState(false);
  const [editor, setEditor] = useState(null);
  const [editorData, setEditorData] = useState();

  const editorConfig = {
    language: 'pt-br',
    plugins: [
      Essentials,
      PasteFromOffice,

      Bold,
      Italic,
      Underline,
      Strikethrough,
      Subscript,
      Superscript,
      Font,
      Alignment,
      List,
      Indent,
      IndentBlock,
      RemoveFormat,

      Table,
      TableToolbar,
      TableProperties,
      TableCellProperties,

      Image,
      ImageToolbar,
      ImageCaption,
      ImageStyle,
      ImageResize,

      ImageGallery,
    ],
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'subscript',
        'superscript',
        'fontColor',
        'fontBackgroundColor',
        'selectAll',
        'removeFormat',
        '|',
        'alignment',
        'numberedList',
        'bulletedList',
        'outdent',
        'indent',
        '|',
        'insertTable',
        'imageGallery',
      ],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableProperties',
        'tableCellProperties',
      ],
    },
    image: {
      resizeUnit: 'px',
      toolbar: [
        'imageStyle:alignLeft',
        'imageStyle:full',
        'imageStyle:alignRight',
      ],
      styles: ['full', 'alignLeft', 'alignRight'],
    },
    imageGallery: {
      showImagesList: showImagesList,
      setShowImagesList: setShowImagesList,
    },
  };

  const handleEditorDataChange = (evt, editor) => {
    setEditorData(editor.getData());
  };

  const handleEditorInit = (editor) => {
    setEditor(editor);
    setEditorData(editor.getData());
  };

  const handleImagesList = () => {
    return <>{showImagesList && <ImagesList editor={editor} />}</>;
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        config={editorConfig}
        onChange={handleEditorDataChange}
        onInit={handleEditorInit}
      />

      <p>Source:</p>
      <textarea
        value={editorData}
        readOnly
        style={{ width: '100%', height: '200px' }}
      />

      {handleImagesList()}
    </div>
  );
}
