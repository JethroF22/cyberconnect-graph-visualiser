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
};

export const nodeMouseOutHandler = (
  event: cytoscape.EventObject,
  cy: cytoscape.Core
) => {
  let target: cytoscape.NodeSingular = event.target;
  cy.elements().removeClass("semitransp");
  const connectedEdges = target.connectedEdges();
  connectedEdges.forEach((edge) => {
    edge.style("display", "none");
  });
  cy.elements().addClass("highlight");
};
