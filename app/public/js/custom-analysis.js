$(document).ready(function () {
    if ($('#morris-area-chart').length > 0) {
        Morris.Area({
            element: 'morris-area-chart',
            data: [{
                period: '2010 Q1',
                iphone: 2666,
                ipad: null,
                itouch: 2647
            }, {
                period: '2010 Q2',
                iphone: 2778,
                ipad: 2294,
                itouch: 2441
            }, {
                period: '2010 Q3',
                iphone: 4912,
                ipad: 1969,
                itouch: 2501
            }, {
                period: '2010 Q4',
                iphone: 3767,
                ipad: 3597,
                itouch: 5689
            }, {
                period: '2011 Q1',
                iphone: 6810,
                ipad: 1914,
                itouch: 2293
            }, {
                period: '2011 Q2',
                iphone: 5670,
                ipad: 4293,
                itouch: 1881
            }, {
                period: '2011 Q3',
                iphone: 4820,
                ipad: 3795,
                itouch: 1588
            }, {
                period: '2011 Q4',
                iphone: 15073,
                ipad: 5967,
                itouch: 5175
            }, {
                period: '2012 Q1',
                iphone: 10687,
                ipad: 4460,
                itouch: 2028
            }, {
                period: '2012 Q2',
                iphone: 8432,
                ipad: 5713,
                itouch: 1791
            }],
            xkey: 'period',
            ykeys: ['itouch'],
            labels: ['人次'],
            pointSize: 2,
            hideHover: 'auto',
            pointFillColors: ['#ffffff'],
            pointStrokeColors: ['black'],
            lineColors: ['#A6A6A6', '#414e63'],
            resize: true
        });
    }

    if($('#morris-donut-chart').length > 0){
        Morris.Donut({
            element: 'morris-donut-chart',
            data: [{
                label: "Profits",
                value: 12
            }, {
                label: "Users",
                value: 30
            }, {
                label: "Total Sales",
                value: 20
            }],
            colors: [
                '#A6A6A6', '#414e63',
                '#e96562'
            ],
            resize: true
        });
    }

    $('.donut-chart').cssCharts({
        type: "donut"
    }).trigger('show-donut-chart');
    $('.line-chart').cssCharts({
        type: "line"
    });

    $('.pie-thychart').cssCharts({
        type: "pie"
    });

    $('li.collection-item').on('click', function (e) {
        var id = $(this).attr('data-id');
        window.location.href = '/control/analysis?id=' + id;
    })

    // 找到所有的可以做为chart的元素，一一绘制图像
    $('.mychart').each((index, element) => {
        var id = $(element).attr('id');
        if(answers.length > 0) {
            initChart(id);
        }
    });


});
function initChart(id) {
    var colors = ['#414e63','#e96562', '#CC99FF', '#FFCC33', '#A6A6A6', '#FF9900', '#CCCC33', '#99CC33', '#339966'];
    // 根据id解析出第几题
    if(!id) return;
    var type = id.split('_')[0];
    var order = id.split('_')[1];
    // 得到[{content: 'aa', percent: 5}, {content: 'bb', percent: 95}]
    // 当前题目的所有选项
    var topics = JSON.parse($(`#${id}`).attr('data-topics'));
    // 题目下一共有的选项数目
    answers && answers.map(item => {
        var percent = topics[item.answer[+order + 1]].percent;
        topics[item.answer[+order + 1]].percent = percent ? (percent + 1) : 1;
    });
    var data = [];
    var len = topics.length;
    for(var i = 0; i < len; i++) {
        data.push({label: topics[i].content, value: topics[i].percent || 0});
    }
    if(type == 'radio') {
        // 开始绘制图形
        Morris.Donut({
            element: id,
            data,
            colors: colors.slice(0, len),
            resize: true
        });
    }
}

