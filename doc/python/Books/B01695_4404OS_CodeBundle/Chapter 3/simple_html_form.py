{% load bootstrap3 %} 

{%# simple HTML form #%} 
<form action="action_url"> 
    {% csrf_token %} 
    {% bootstrap_form sample_form %} 
    {% buttons %} 
        <button type="submit" class="btn btn-primary"> 
            {% bootstrap_icon "heart" %} SUBMIT 
        </button> 
    {% endbuttons %} 
</form> 
