<div class="controls form-inline">
    <label>{atktext 'show'}:</label>
    <select onchange="{$call|escape}" class="form-control">
    {foreach from=$options item='option}
        <option value="{$option.value|escape}"{if $option.current} selected="selected"{/if}>{$option.title|escape}</option>
        {/foreach}
    </select>
</div>