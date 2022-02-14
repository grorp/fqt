type TemplateNode = {
    type: TemplateNodeType;
    content: string;
};

enum TemplateNodeType {
    Text,
    Expression,
    Script,
}

function parseTemplate(template: string): TemplateNode[] {
    const strNodes = template.split(/(?=<%=|<%)|(?<=%>)/);
    const nodes: TemplateNode[] = [];
    for (const strNode of strNodes) {
        if (strNode.startsWith('<%=') && strNode.endsWith('%>')) {
            nodes.push({
                type: TemplateNodeType.Expression,
                content: strNode.slice(3, -2),
            });
        } else if (strNode.startsWith('<%') && strNode.endsWith('%>')) {
            nodes.push({
                type: TemplateNodeType.Script,
                content: strNode.slice(2, -2),
            });
        } else {
            nodes.push({
                type: TemplateNodeType.Text,
                content: strNode,
            });
        }
    }
    return nodes;
}

type TemplateFunction = (data: unknown) => string;

function makeTemplateFunction(nodes: TemplateNode[]): TemplateFunction {
    let code = '';

    code += 'let ____result____ = "";\n';

    for (const node of nodes) {
        if (node.type === TemplateNodeType.Text) {
            code += '____result____ += ' + JSON.stringify(node.content);
        }
        if (node.type == TemplateNodeType.Expression) {
            code += '____result____ += (' + node.content + ')';
        }
        if (node.type == TemplateNodeType.Script) {
            code += node.content;
        }
        code += ';\n';
    }

    code += 'return ____result____;';

    return new Function('data', code) as TemplateFunction;
}

export {
    TemplateNode,
    TemplateNodeType,
    parseTemplate,
    TemplateFunction,
    makeTemplateFunction,
};
