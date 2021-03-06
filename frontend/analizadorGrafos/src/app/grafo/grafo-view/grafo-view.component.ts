import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as go from 'gojs';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
import produce from "immer";
import { GrafoService } from '../grafo.service';

@Component({
  selector: 'app-grafo-view',
  templateUrl: './grafo-view.component.html',
  styleUrls: ['./grafo-view.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class GrafoViewComponent implements OnInit {

  @ViewChild('myDiagram', { static: true }) public myDiagramComponent: DiagramComponent;
  @ViewChild('myPalette', { static: true }) public myPaletteComponent: PaletteComponent;


  idGrafoDefect = "";


  constructor(private router: Router, private routerAct: ActivatedRoute, private grafoService: GrafoService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.routerAct.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.idGrafoDefect = params.get('id')!;
        console.log(this.idGrafoDefect);
        this.grafoService.getGrafo(this.idGrafoDefect).subscribe(
          data => {
            console.log(data);
            this.state.diagramNodeData = data.data.nodes;
            this.state.diagramLinkData = data.data.edges;
            //this.cdr.detectChanges();
          },
          error => console.log(error)
        );
      }
    });
    //console.log(this.state)

  }

  saveGrafo() {
    console.log(this.state)
    //TODO: actualizar grafo en la BD, pero debo validar si existe de lo contrario crearlo
    let existeGrafo = false;
    if (existeGrafo) {

    }
    else {

    }

  }


  public state = {
    // Diagram state props

    diagramNodeData: [
      { id: 'Alpha', text: "Alpha", color: 'lightblue', loc: "0 0" },
      { id: 'Beta', text: "Beta", color: 'orange', loc: "100 0" },
      { id: 'Gamma', text: "Gamma", color: 'lightgreen', loc: "0 100" },
      { id: 'Delta', text: "Delta", color: 'pink', loc: "100 100" }
    ],
    diagramLinkData: [
      { key: -1, from: 'Alpha',to: 'Beta', 'progress': 'true' , fromPort: 'r', toPort: '1' },
      { key: -2, from: 'Alpha', to: 'Gamma', fromPort: 'b', toPort: 't' },
      { key: -3, from: 'Beta', to: 'Beta' },
      { key: -4, from: 'Gamma', to: 'Delta', fromPort: 'r', toPort: 'l' },
      { key: -5, from: 'Delta', to: 'Alpha', fromPort: 't', toPort: 'r' }
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

  public initDiagram(): go.Diagram {

    const $ = go.GraphObject.make;
    const dia = $(go.Diagram, {
      'undoManager.isEnabled': true,
      'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
      model: $(go.GraphLinksModel,
        {
          nodeKeyProperty: 'id',
          linkToPortIdProperty: 'toPort',
          linkFromPortIdProperty: 'fromPort',
          linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }
      )
    });

    // replace the default Link template in the linkTemplateMap
    dia.linkTemplate =
    $(go.Link,  // the whole link panel
      {
        curve: go.Link.Bezier,
        adjusting: go.Link.Stretch,
        reshapable: true, relinkableFrom: true, relinkableTo: true,
        toShortLength: 3
      },
      new go.Binding("points").makeTwoWay(),
      new go.Binding("curviness"),
      $(go.Shape,  // the link shape
        { strokeWidth: 1.5 },
        new go.Binding('stroke', 'progress', progress => progress ? "#52ce60" /* green */ : 'black'),
        new go.Binding('strokeWidth', 'progress', progress => progress ? 2.5 : 1.5)),
      $(go.Shape,  // the arrowhead
        { toArrow: "standard", stroke: null },
        new go.Binding('fill', 'progress', progress => progress ? "#52ce60" /* green */ : 'black')),
      // $(go.Panel, "Auto",
      //   $(go.Shape,  // the label background, which becomes transparent around the edges
      //     {
      //       fill: $(go.Brush, "Radial",
      //         { 0: "rgb(245, 245, 245)", 0.7: "rgb(245, 245, 245)", 1: "rgba(245, 245, 245, 0)" }),
      //       stroke: null
      //     }),
      //   $(go.TextBlock, "transition",  // the label text
      //     {
      //       textAlign: "center",
      //       font: "9pt helvetica, arial, sans-serif",
      //       margin: 4,
      //       editable: true  // enable in-place editing
      //     },
      //     // editing the text automatically updates the model data
      //     new go.Binding("text").makeTwoWay())
      // )
    );

    dia.commandHandler.archetypeGroupData = { key: 'Group', isGroup: true };

    const makePort = function (id: string, spot: go.Spot) {
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
                { click: function (e, obj) { e.diagram.commandHandler.groupSelection(); } },
                new go.Binding('visible', '', function (o) {
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

  insertNode() {
    console.log('insertNode');
  }
  insertEdge() {
    console.log('insertEdge');
  }
  modifiedNode() {
    console.log('modificadNode');
  }
  modifiedEdge() {
    console.log('modificadEdge');
  }
  removeNode() {
    console.log('removeNode');
  }
  removeEdge() {
    console.log('removeEdge');
  }

  // When the diagram model changes, update app data to reflect those changes. Be sure to use immer's "produce" function to preserve immutability
  public diagramModelChange = (changes: go.IncrementalData) => {
    //TODO: hacer metodos de add, delete, update al this.state y enviar a la BD
    if (changes.insertedNodeKeys) {
      this.insertNode()
    }
    else if (changes.insertedLinkKeys) {
      this.insertEdge()
    }
    else if (changes.modifiedNodeData) {
      this.modifiedNode();
    }
    else if (changes.modifiedLinkData) {
      this.modifiedEdge();
    }
    else if (changes.removedNodeKeys) {
      this.removeNode();
    }
    else if (changes.removedLinkKeys) {
      this.removeEdge();
    }
    else {
      console.log('ninguno');
    }
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



  // Overview Component testing
  public oDivClassName = 'myOverviewDiv';
  public initOverview(): go.Overview {
    const $ = go.GraphObject.make;
    const overview = $(go.Overview);
    return overview;
  }

  public observedDiagram = null;

  // currently selected node; for inspector
  public selectedNodeData: go.ObjectData;

  /*public ngAfterViewInit() {
    if (this.observedDiagram) return;
    //this.observedDiagram = this.myDiagramComponent.diagram;
    this.cdr.detectChanges(); // IMPORTANT: without this, Angular will throw ExpressionChangedAfterItHasBeenCheckedError (dev mode only)

    //const appComp: AppComponent = this;
    // listener for inspector
    this.myDiagramComponent.diagram.addDiagramListener('ChangedSelection', function(e) {
      if (e.diagram.selection.count === 0) {
        appComp.selectedNodeData = null;
      }
      const node = e.diagram.selection.first();
      appComp.state = produce(appComp.state, draft => {
        if (node instanceof go.Node) {
          var idx = draft.diagramNodeData.findIndex(nd => nd.id == node.data.id);
          var nd = draft.diagramNodeData[idx];
          draft.selectedNodeData = nd;
        } else {
          draft.selectedNodeData = null;
        }
      });
    });
  } // end ngAfterViewInit  */


  /**
   * Update a node's data based on some change to an inspector row's input
   * @param changedPropAndVal An object with 2 entries: "prop" (the node data prop changed), and "newVal" (the value the user entered in the inspector <input>)
   */
  /*public handleInspectorChange(changedPropAndVal) {

    const path = changedPropAndVal.prop;
    const value = changedPropAndVal.newVal;

    this.state = produce(this.state, draft => {
      var data = draft.selectedNodeData;
      data[path] = value;
      const key = data.id;
      const idx = draft.diagramNodeData.findIndex(nd => nd.id == key);
      if (idx >= 0) {
        draft.diagramNodeData[idx] = data;
        draft.skipsDiagramUpdate = false; // we need to sync GoJS data with this new app state, so do not skips Diagram update
      }
    });
  }*/


}
