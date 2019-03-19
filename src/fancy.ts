/// without usage of modules `render_statuses` becomes a globally visible function
function render_statuses(target_element: HTMLElement, urls: string[]) {

    // helpers defined inside not to pullute the global scope
    const ELEMENT_ID = "MY_FANCY_TABLE";

    async function test_url(url: string): Promise<boolean> {
        try {
            await fetch(url);
            return true;
        } catch {
            return false;
        }
    }

    function createTableRow(cells: string[]): HTMLTableRowElement {
        let tr = document.createElement("tr");

        cells.map((cell_inner_html) => {
            let td = document.createElement("td");
            td.innerHTML = cell_inner_html;
            tr.appendChild(td);
            return td;
        });

        return tr;
    }

    // the actual body of the function starts here

    // cleanup of possibly already created table
    const old_table = target_element.querySelector(`#${ELEMENT_ID}`);
    if (old_table) {
        old_table.remove();
    }

    // create new table
    let table = target_element.appendChild(document.createElement("table"));
    table.setAttribute("id", ELEMENT_ID);
    // html standard only allows thead, tbody and tfoot children of table element
    let tbody = table.appendChild(document.createElement("tbody"));

    // note: the order of elements in the final table is not guaranteed in any way
    urls.forEach(async (url) => {
        const status = await test_url(url) ? `<span class="ok">OK</span>` : `<span class="fail">FAIL</span>`;
        tbody.appendChild(createTableRow([url, status]));
    })
}