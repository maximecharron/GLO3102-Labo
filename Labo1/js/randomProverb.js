/**
 * Created by macha762 on 2015-09-03.
 */
$(document).ready(
    function(){
        $('.randomProverb').each(function(index, elem) {
            $.ajax({
                url: "https://api.github.com/zen",
                cache: false,
                success: function(html){
                    $(elem).html(html);
                }
            });
        })
        });