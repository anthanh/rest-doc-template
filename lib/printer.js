/*! REST Doc Template | @antaipt | MIT/GPL2 Licensed
  source: https://github.com/anthanh/rest-doc-template  */

var api = {

    data: null,

    getData: function() {
        return $.ajax({
            url: 'res/blueprint.json',
            dataType: 'json'
        }).done(function(data) {
            api.data = data;
        });
    },

    resourceHTML: function(resource) {
        var html = '';
        var id = resource.method.toLowerCase() + resource.path.replace('/', '-').replace('/', '-').replace('/', '-').replace('{', '').replace('}', '');
        var title =

        html += '<div id="' + id + '" class="page-header">';
        html += '<h1>' + resource.method + ' ' + resource.path + '</h1>';
        html += '</div>';

        html += '<div class="row well ' + (resource.deprecated?'deprecated':'') + '">';

        html += '<div class="span2 description">';
        html += '<h3>Descripción</h3>';
        if ($.isArray(resource.description)) {
            $.each(resource.description, function(index, description) {
                html += '<p>' + description + '</p>';
            });
        } else {
            html += '<p>' + resource.description + '</p>';
        }
        html += '</div>';

        html += '<div class="span10">';
        html += '<div class="row">';
        html += '<div class="span12">';

        html += '<h3>Propiedades</h3>';
        html += '<table class="table table-bordered table-striped">                  ';
        html += '<tbody>';
        html += '<tr>';
        html += '<td>Ruta</td>';
        html += '<td><code>' + resource.path + '</code></td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td>Tipo de recurso</td>';

        switch (resource.method) {
        case 'GET':
            html += '<td><span class="label label-success">GET</span></td>';
            break;
        case 'POST':
            html += '<td><span class="label label-warning">POST</span></td>';
            break;
        case 'PUT':
            html += '<td><span class="label label-info">PUT</span></td>';
            break;
        default:
            html += '<td><span class="label">?</span></td>';
        }

        html += '<tr>';
        html += '<td>¿Requiere estar autenticado?</td>';
        html += '<td><span class="label label-' + (resource.logued ? 'success' : 'info') + '">' + (resource.logued ? 'Sí' : 'No') + '</span></td>';
        html += '</tr>';

        html += '</tbody>';
        html += '</table>';

        if (resource.query) {
            html += '<h3>Parámetros query string</h3>';
            html += '<table class="table table-bordered table-striped">';
            html += '<thead>';
            html += '<tr>';
            html += '<th>Nombre</th>';
            html += '<th>Obligatorio</th>';
            html += '<th>Tipo</th>';
            html += '<th>Observaciones</th>';
            html += '<th>Por defecto</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            $.each(resource.query, function(index, param) {
                html += '<tr>';
                html += '<td>' + param.name + '</td>';
                html += '<td><span class="label label-' + (param.required ? 'success' : 'info') + '">' + (param.required ? 'Sí' : 'No') + '</span></td>';
                switch (param.type) {
                case 'integer':
                    html += '<td><span class="label label-inverse">integer</span></td>';
                    break;
                case 'String':
                    html += '<td><span class="label label-warning">String</span></td>';
                    break;
                default:
                    html += '<td><span class="label">?</span></td>';
                }
                html += '<td><p>' + param.description + '</p></td>';
                html += '<td><code>' + param['default'] + '</code></td>';
                html += '</tr>';
            });

            if ($.isArray(resource.queryExample)) {
                $.each(resource.queryExample, function(index, queryExample) {
                    html += '<tr>';
                    html += '<td>Ejemplo</td>';
                    html += '<td colspan="4"><code>' + queryExample + '</code></td>';
                    html += '</tr>';
                });
            } else {
                html += '<tr>';
                html += '<td>Ejemplo</td>';
                html += '<td colspan="4"><code>' + resource.queryExample + '</code></td>';
                html += '</tr>';
            }

            html += '</tbody>';
            html += '</table>';
        }

        if (resource.data) {
            html += '<h3>Datos</h3>';
            html += '<pre>';
            try {
                html += JSON.stringify(JSON.parse(resource.data), null, 4);
            } catch (err) {
                html += resource.data;
            }
            html += '</pre>';
        }

        html += '<h3>Respuesta</h3>';
        html += '<pre>';
        html += JSON.stringify(JSON.parse(resource.response), null, 4);
        html += '</pre>';

        html += '<h3>Códigos de estado</h3>';
        html += '<table class="table table-bordered table-striped">';
        html += '<thead>';
        html += '<tr>';
        html += '<th>Código</th>';
        html += '<th>Motivo</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';

        $.each(resource.codeStatus, function(index, status) {
            html += '<tr>';
            if (status.code >= 200 && status.code <= 299) {
                html += '<td><span class="label label-success">' + status.code + '</span></td>';
            } else if (status.code >= 400 && status.code <= 499) {
                html += '<td><span class="label label-warning">' + status.code + '</span></td>';
            } else if (status.code >= 500 && status.code <= 599) {
                html += '<td><span class="label label-inverse">' + status.code + '</span></td>';
            }

            html += '<td>' + status.reason + '</td>';
            html += '</tr>';
        });


        html += '</tbody>';
        html += '</table>';

        if (resource.comments) {
            html += '<h3>Observaciones</h3>';
            if ($.isArray(resource.comments)) {
                $.each(resource.comments, function(index, comment) {
                    html += '<p>' + comment + '</p>';
                });
            } else {
                html += '<p>' + resource.comments + '</p>';
            }
        }

        html += '<a class="btn btn-info" href="#">Volver arriba</a>';

        html += '</div>';
        html += '</div>';
        html += '</div>';

        html += '</div>';


        return html;
    },
    print: function() {
        var that = this;

        var html = '';
        $.each(this.data.resources, function(index, resource) {
            html += that.resourceHTML(resource);
        });
        $('#api').append(html);

        $.each(this.data.resources, function(index, resource) {
            var id = '#' + resource.method.toLowerCase() + resource.path.replace('/', '-').replace('/', '-').replace('/', '-').replace('{', '').replace('}', '');
            var label = '';
            switch (resource.method) {
            case 'GET':
                label = 'label-success';
                break;
            case 'POST':
                label = 'label-warning';
                break;
            case 'PUT':
                label = 'label-info';
                break;
            }

            var deprecated = (resource.deprecated?' data-toggle="tooltip" data-placement="top" title="" data-original-title="Deprecated"':'');

            var html = '<li><a href="' + id + '"' + deprecated + '><p><span class="label ' + label + '">' + resource.method + '</span> ' + resource.path + '</p></a></li>';

            // Create sidebar item header if not exists
            if ($('#' + resource.type).length === 0) {
                $('#side-menu').append('<ul id="' + resource.type + '" class="nav nav-list"><li class="nav-header cursor-pointer"><h4><i class="icon-plus"></i>' + resource.type + '</h4></li></ul>');
            }
            $('#' + resource.type).append(html);
        });
    }
};

api.getData().done(function(data) {
    api.print();

    $('.action-style-flatty').click(function(evt) {
        $('#style').attr('href', 'lib/bootstrap/css/bootstrap.min.flatty.css');
        evt.preventDefault();
    });

    $('.action-style-simplex').click(function(evt) {
        $('#style').attr('href', 'lib/bootstrap/css/bootstrap.min.simplex.css');
        evt.preventDefault();
    });

    $('.action-style-default').click(function(evt) {
        $('#style').attr('href', 'lib/bootstrap/css/bootstrap.min.default.css');
        evt.preventDefault();
    });

    $('a[data-toggle="tooltip"]').tooltip().addClass('deprecated');

    $('.nav-list .nav-header').click(function(evt) {
        if ($(this).find('.icon-plus').length !== 0) {
            $(this).find('.icon-plus').removeClass('icon-plus').addClass('icon-minus');
            $(this).siblings().slideUp();
        } else {
            $(this).find('.icon-minus').removeClass('icon-minus').addClass('icon-plus');
            $(this).siblings().slideDown();
        }
    });
});
