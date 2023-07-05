export const createModal = (contentId, fallback) => {
    let fallbackText = fallback;
    let contentTemplateEl = document.getElementById(contentId);
    let modalTemplateEl = document.getElementById('modal-template');
    let modalElement;
    let backdropElement;

    const show = () => {
        if ('content' in document.createElement('template')) {
            const modalElements = document.importNode(modalTemplateEl.content, true);
            modalElement = modalElements.querySelector('.modal');
            backdropElement = modalElements.querySelector('.backdrop');
            const contentElement = document.importNode(contentTemplateEl.content, true);

            modalElement.appendChild(contentElement);

            document.body.insertAdjacentElement('afterbegin', modalElement);
            document.body.insertAdjacentElement('afterbegin', backdropElement);
        } else {
            alert(fallbackText);
        }
    };

    const hide = () => {
        if (modalElement) {
            document.body.removeChild(modalElement);
            document.body.removeChild(backdropElement);
            modalElement = null;
            backdropElement = null;
        }
    };

    return {
        show,
        hide
    };
};
