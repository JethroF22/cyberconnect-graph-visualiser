import cytoscape from "cytoscape";

export const nodeMouseOverHandler = (
  event: cytoscape.EventObject,
  cy: cytoscape.Core
) => {
  let target: cytoscape.NodeSingular = event.target;
  const connectedEdges = target.connectedEdges();
  cy.edges(":unselected").style("display", "none");
  cy.elements().removeClass("highlight");
  connectedEdges.forEach((edge) => {
    edge.style("display", "element");
  });
  cy.elements()
    .difference(target.outgoers().union(target.incomers()))
    .not(target)
    .addClass("semitransparent");
  target
    .addClass("highlight")
    .outgoers()
    .union(target.incomers())
    .addClass("highlight");
  target.addClass("labelled");
};

export const nodeMouseOutHandler = (
  event: cytoscape.EventObject,
  cy: cytoscape.Core
) => {
  let target: cytoscape.NodeSingular = event.target;
  cy.elements().removeClass("semitransp");
  target.removeClass("labelled");
  const connectedEdges = target.connectedEdges();
  connectedEdges.forEach((edge) => {
    edge.style("display", "none");
  });
  cy.elements().addClass("highlight");
};

export const nodeOnClickHandler = (
  event: cytoscape.EventObject,
  cy: cytoscape.Core,
  setModalDisplayState: (displayState: boolean) => void
) => {
  let target: cytoscape.NodeSingular = event.target;
  const { data } = target;
  setModalDisplayState(true);
};
