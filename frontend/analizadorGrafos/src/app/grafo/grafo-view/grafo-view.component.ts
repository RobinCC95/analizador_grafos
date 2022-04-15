import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import * as go from 'gojs';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
import produce from "immer";

@Component({
  selector: 'app-grafo-view',
  templateUrl: './grafo-view.component.html',
  styleUrls: ['./grafo-view.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class GrafoViewComponent implements OnInit {
  public state = {
    // Diagram state props
    diagramNodeData: [
      { id: 'Alpha', text: "Alpha", color: 'lightblue' },
        { id: 'Beta', text: "Beta", color: 'orange' },
        { id: 'Omega', text: "Omega", color: 'red' }
      ],
      diagramLinkData: [
        { key: -1, from: 'Alpha', to: 'Beta' },
        { key: 2, from: 'Alpha', to: 'Omega' }

      ],
      diagramModelData: { prop: 'value' },
      skipsDiagramUpdate: false,
      selectedNodeData: null, // used by InspectorComponent

      // Palette state props
      paletteNodeData: [
        { key: 'Epsilon', text: 'Epsilon', color: 'red' },
        { key: 'Kappa', text: 'Kappa', color: 'purple' }
      ],
      paletteModelData: { prop: 'val' }
    };

  public diagramDivClassName: string = 'myDiagramDiv';
  public paletteDivClassName = 'myPaletteDiv';



  constructor() {

  }

  ngOnInit(): void {

  }
  // initialize diagram / templates
public initDiagram(): go.Diagram {
  const $ = go.GraphObject.make;
  const dia = $(go.Diagram, {
    'undoManager.isEnabled': true,
    model: new go.GraphLinksModel(
      {
        nodeKeyProperty: 'id',
        linkToPortIdProperty: 'toPort',
        linkFromPortIdProperty: 'fromPort',
        linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      }
    )
  });
  dia.commandHandler.archetypeGroupData = { key: 'Group', isGroup: true };

    const makePort = function(id: string, spot: go.Spot) {
      return $(go.Shape, 'Circle',
        {
          opacity: .5,
          fill: 'gray', strokeWidth: 0, desiredSize: new go.Size(8, 8),
          portId: id, alignment: spot,
          fromLinkable: true, toLinkable: true
        }
      );
    }

  // define the Node template
  dia.nodeTemplate =
      $(go.Node, 'Spot',
        {
          contextMenu:
            $('ContextMenu',
              $('ContextMenuButton',
                $(go.TextBlock, 'Group'),
                { click: function(e, obj) { e.diagram.commandHandler.groupSelection(); } },
                new go.Binding('visible', '', function(o) {
                  return o.diagram.selection.count > 1;
                }).ofObject())
            )
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, 'Auto',
          $(go.Shape, 'RoundedRectangle', { stroke: null },
            new go.Binding('fill', 'color', (c, panel) => {

              return c;
            })
          ),
          $(go.TextBlock, { margin: 8, editable: true },
            new go.Binding('text').makeTwoWay())
        ),
        // Ports
        makePort('t', go.Spot.TopCenter),
        makePort('l', go.Spot.Left),
        makePort('r', go.Spot.Right),
        makePort('b', go.Spot.BottomCenter)
      );

    return dia;
  }

/**
 * Handle GoJS model changes, which output an object of data changes via Mode.toIncrementalData.
 * This method should iterate over thoe changes and update state to keep in sync with the FoJS model.
 * This can be done with any preferred state management method, as long as immutability is preserved.
 */
public diagramModelChange = function(changes: go.IncrementalData) {
  console.log(changes);
  // see gojs-angular-basic for an example model changed handler that preserves immutability
  // when setting state, be sure to set skipsDiagramUpdate: true since GoJS already has this update
};




public initPalette(): go.Palette {
  const $ = go.GraphObject.make;
  const palette = $(go.Palette);

  // define the Node template
  palette.nodeTemplate =
    $(go.Node, 'Auto',
      $(go.Shape, 'RoundedRectangle',
        {
          stroke: null
        },
        new go.Binding('fill', 'color')
      ),
      $(go.TextBlock, { margin: 8 },
        new go.Binding('text', 'key'))
    );

  palette.model = $(go.GraphLinksModel);
  return palette;
}



}
