import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { OcsService } from '../../../ocs.service';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddNewRelationshipModalComponent } from './add-new-relationship-modal/add-new-relationship-modal.component';


@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.css', '../../../ocs.component.css']
})
export class RelationshipComponent implements OnInit {
    assetId:any;
    relationShipData:any = {};
    parentCiData:any = {};
    dataLoader:boolean;
    baseHeight:any;
    childrenCount:any;
    noDataFound:boolean = false;
    constructor(private route: ActivatedRoute,private ocsService: OcsService, private router : Router, public dialog: MatDialog){
        this.route.params.subscribe((params: Params) => {
            this.assetId = params['id'];
          });
    }
  

  ngOnInit(){
      this.getRelationshipData();
  }

  getRelationshipData(){
    this.dataLoader = true;
    this.relationShipData = [];
    this.ocsService.getRelationShip(this.assetId, resp=>{
    this.relationShipData = resp.data;
    this.parentCiData = {
        "id" : this.assetId,
        "name" : this.relationShipData.ciName
    }
    if(this.relationShipData.ciName == null){
        this.dataLoader = false;
        return this.noDataFound = true;
    }
    if(this.relationShipData.children != null){
        this.childrenCount = this.relationShipData.children.length;
        if(this.childrenCount < 5){
            this.baseHeight = 200;
        }else if(this.childrenCount < 10){
            this.baseHeight = 300;
        }else if(this.childrenCount < 15){
            this.baseHeight = 400;
        }else if(this.childrenCount < 20){
            this.baseHeight = 600;
        }else if(this.childrenCount < 25){
            this.baseHeight = 800;
        }else if(this.childrenCount < 30){
            this.baseHeight = 900;
        }else if(this.childrenCount < 35){
            this.baseHeight = 1000;
        }else{
            this.baseHeight = 1200;
        }
    }
    this.dataLoader = false;
    var margin = {
        top: 20,
        right: 120,
        bottom: 20,
        left: 120
    },
    width = 900,
    height = this.baseHeight - margin.top - margin.bottom;
    
    var i = 0,
        duration = 750,
        root,
        zm;
    
    var tree = d3.layout.tree()
        .size([height, width])
        .nodeSize([30, 10]);

    
    var diagonal = d3.svg.diagonal()
        .projection(function (d) {
        return [d.y, d.x];
    });
     var svg = d3.select("div#chart").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        //.call(zm = d3.behavior.zoom().scaleExtent([1,3]).on("zoom", redraw)).append("g")
        .attr("transform", "translate(" + 100 + "," + height/2 + ")");
    
        //necessary so that zoom knows where to zoom and unzoom from
    //zm.translate([550, 20]);
    //Redraw for zoom
    function redraw() {
    //console.log("here", d3.event.translate, d3.event.scale);
    svg.attr("transform",
        "translate(" + d3.event.translate + ")"
        + " scale(" + d3.event.scale + ")");
    }
    root = this.relationShipData;
    root.x0 = height / 2;
    root.y0 = 0;
    
    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    }
    
    root.children.forEach(collapse);
    update(root, this.router);
    //});
    
    d3.select(self.frameElement).style("height", "800px");
    
    function update(source, router) {
    
        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);
    
        // Normalize for fixed-depth.
        nodes.forEach(function (d) {
            d.y = d.depth * 180;
        });
    
        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) {
            return d.id || (d.id = ++i);
        });
    
        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
            return "translate(" + source.x0 + "," + source.y0 + ")";
        })
            .on("click", click);
    
        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        });
    
        nodeEnter.append("text")
            .attr("x", function (d) {
            return d.children || d._children == [] ? -10 : 10;
        })
            .attr("dy", ".35em")
            .attr("text-anchor", function (d) {
            return d.children || d._children == [] ? "end" : "start";
        })
        .text(function (d) {
            return d.ciName;
        })
        .on("click", function(d){
            router.navigate(['/ocs/asset-details', d.ciId], "_blank")
            router.events.subscribe((evt) => {
                if (evt instanceof NavigationEnd) {
                    window.open(window.location.href, "_blank");
                }
            });
        })
        .style("fill-opacity", 1e-6);
    
        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });
    
        nodeUpdate.select("circle")
            .attr("r", 4.5)
            .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        });
    
        nodeUpdate.select("text")
            .style("fill-opacity", 1);
    
        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
            .remove();
    
        nodeExit.select("circle")
            .attr("r", 1e-6);
    
        nodeExit.select("text")
            .style("fill-opacity", 1e-6);
    
        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function (d) {
            return d.target.id;
        });
    
        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
            var o = {
                x: source.x0,
                y: source.y0
            };
            return diagonal({
                source: o,
                target: o
            });
        });
    
        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);
    
        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function (d) {
            var o = {
                x: source.x,
                y: source.y
            };
            return diagonal({
                source: o,
                target: o
            });
        })
            .remove();
    
        // Update the link text
        var linktext = svg.selectAll("g.link")
            .data(links, function (d) {
            return d.target.id;
        });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        linktext.enter()
            .insert("g")
            .attr("class", "link")
            .attr("fill", "red")
            .append("text")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function (d) {
            console.log(d.target);
            return d.target.relationShip;
        });
    
        // Transition link text to their new positions
    
        linktext.transition()
            .duration(duration)
            .attr("transform", function (d) {
            return "translate(" + ((d.source.y + d.target.y) / 2) + "," + ((d.source.x + d.target.x) / 2) + ")";
        })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        //Transition exiting link text to the parent's new position.
        linktext.exit().transition()
            .remove();
    
    
        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }
    
    // Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d, this.router);
    }
},error=>{});
  }

  onClickAddRelationship(){
    const dialogRef = this.dialog.open(AddNewRelationshipModalComponent, {
        width: '400px',
        data:this.parentCiData
      });
  
      dialogRef.afterClosed().subscribe(result => {
        var el = document.getElementsByTagName('svg');
        el[0].parentNode.removeChild(el[0])
        this.getRelationshipData();
      });
  }
  
}
