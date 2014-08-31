/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';

    config.toolbar_atk =
            [
                {name: 'document', items: ['Source']},
                {name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
                {name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt']},
                '/',
                {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']},
                {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']},
                {name: 'links', items: ['Link', 'Unlink', 'Anchor']},
                '/',
                {name: 'styles', items: ['Format', 'FontSize']},
                {name: 'colors', items: ['TextColor', 'BGColor']},
                {name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar']},
                {name: 'tools', items: ['Preview', 'ShowBlocks', 'Maximize']}
            ];

    config.toolbar_atklite =
            [
                ['Bold', 'Italic', '-', 'RemoveFormat', 'Source', '-', 'SpellChecker', 'Scayt']
            ];


    config.toolbar_atkmin =
            [
                ['RemoveFormat', '-', 'Paste', 'PasteText', 'PasteWord', '-', 'Undo', 'Redo', '-', 'Link', 'Unlink', '-', 'Source']
            ];


//    config.toolbar = 'atk';

};
