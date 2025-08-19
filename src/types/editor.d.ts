
declare module '@editorjs/header' {
    import { BlockToolConstructable, ToolSettings } from '@editorjs/editorjs';
    const Header: BlockToolConstructable | ToolSettings;
    export default Header;
}
declare module '@editorjs/list' {
    import { BlockToolConstructable, ToolSettings } from '@editorjs/editorjs';
    const List: BlockToolConstructable | ToolSettings;
    export default List;
}
declare module '@editorjs/link' {
    import { BlockToolConstructable, ToolSettings } from '@editorjs/editorjs';
    const LinkTool: BlockToolConstructable | ToolSettings;
    export default LinkTool;
}
declare module '@editorjs/paragraph' {
    import { BlockToolConstructable, ToolSettings } from '@editorjs/editorjs';
    const Paragraph: BlockToolConstructable | ToolSettings;
    export default Paragraph;
}
declare module 'editorjs-html';
